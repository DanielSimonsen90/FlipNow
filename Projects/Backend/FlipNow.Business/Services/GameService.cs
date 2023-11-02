using DanhoLibrary.Extensions;
using FlipNow.Business.Models;
using FlipNow.Common.Entities;

namespace FlipNow.Business.Services;

public class GameService
{
    private static bool IsNotMatch(GameCard first, GameCard second) => first.Name != second.Name;
    private const int FLIPPED_CARD_TIMEOUT_MS = 500;
    public ActiveGame Game { get; private set; }

    private readonly UnitOfWork _unitOfWork;
    private readonly GameSessionService _sessionService;
    private readonly Guid _hostId;

    public GameService(UnitOfWork unitOfWork, GameSessionService sessionService, 
        string invitePrefix, User host)
    {
        if (sessionService.HasGame(host.Id)) throw new InvalidOperationException("User is already hosting a game");

        _unitOfWork = unitOfWork;
        _sessionService = sessionService;
        Game = new ActiveGame(
            invitePrefix,
            cards: _unitOfWork.CardRepository.GetAllTwiceShuffled(),
            host);

        _hostId = host.Id;

        sessionService.AddGame(_hostId, Game);
    }
    public GameService(UnitOfWork unitOfWork, GameSessionService sessionService,
        ActiveGame game)
    {
        _unitOfWork = unitOfWork;
        _sessionService = sessionService;
        Game = game;
        _hostId = game.Host.User.Id;
    }

    public void StartGame()
    {
        if (Game.PlayState == PlayState.PLAYING) throw new InvalidOperationException("Game is already playing");

        ResetGame();
        Game.PlayState = PlayState.PLAYING;
        UpdateHostedGames();
    }
    public void EndGame()
    {
        if (Game.PlayState != PlayState.PLAYING) throw new InvalidOperationException("Game is not playing");

        Game.PlayState = PlayState.ENDED;
        UpdateHostedGames();
    }
    public void DeleteGame()
    {
        if (Game.PlayState == PlayState.PLAYING) EndGame();
        _sessionService.RemoveGame(_hostId);
    }

    private void ResetGame()
    {
        // Reset turn
        if (Game.TurnPlayerIndex > 0)
            Game.TurnPlayerIndex = 0;

        // Unflip, unmatch and reorder cards
        if (Game.Cards.Any(c => c.Flipped))
            Game.Cards = Game.Cards.Select(gc =>
            {
                gc.Flipped = false;
                gc.MatchedBy = null;
                return gc;
            }).OrderBy(_ => Guid.NewGuid()).ToList();

        // Reset score
        Game.Players.ForEach(p => p.CardMatches = 0);
    }

    /// <summary>
    /// Flip card from <paramref name="index"/>
    /// </summary>
    /// <param name="index">Index in card collection to find card to flip</param>
    /// <exception cref="ArgumentOutOfRangeException"></exception>
    public void FlipCard(int index)
    {
        if (index < 0 || index >= Game.Cards.Count) throw new ArgumentOutOfRangeException(nameof(index));

        Game.Cards[index].Flipped = true;
        UpdateHostedGames();
    }
    public async Task<ActiveGame> ProcessGame()
    {
        // State check
        if (Game.PlayState != PlayState.PLAYING) throw new InvalidOperationException("Game is not playing");
        if (Game.Cards.All(card => card.Matched))
        {
            EndGame();
            await SaveGameAsync();
            return Game;
        }
        if (Game.TurnPlayer is null) throw new InvalidOperationException("Unknown TurnPlayer");

        // Should check card match
        List<GameCard> unmatchedFlippedCards = Game.Cards.Where(c => c.Flipped && !c.Matched).ToList();
        if (unmatchedFlippedCards.Count <= 1) return Game; // Don't check match

        // Allow clients to receive frontend updates for FLIPPED_CARD_TIMEOUT_MS milliseconds
        Thread.Sleep(TimeSpan.FromMilliseconds(FLIPPED_CARD_TIMEOUT_MS));

        // Handle card match
        if (IsNotMatch(unmatchedFlippedCards[0], unmatchedFlippedCards[1]))
        {
            Game.TurnPlayerIndex = (Game.TurnPlayerIndex + 1) % Game.Players.Count; // TurnPlayer loses turn
            Game.Cards = Game.Cards.Select(gc =>
            {
                if (gc.Flipped && !gc.Matched) gc.Flipped = false;
                return gc;
            }).ToList();

            UpdateHostedGames();
            return Game;
        }
        else
        {
            Game.TurnPlayer.CardMatches++;
            Game.Cards = Game.Cards.Select(gc =>
            {
                if (gc.Flipped && !gc.Matched) gc.MatchedBy = Game.TurnPlayer;
                return gc;
            }).ToList();
        }

        if (Game.Cards.All(c => c.Matched))
        {
            EndGame();
            await SaveGameAsync();
            return Game;
        }

        UpdateHostedGames();
        return Game;
    }

    private async Task SaveGameAsync()
    {
        IEnumerable<Guid> playerIds = Game.Players.Select(p => p.User.Id);
        IEnumerable<User> users = _unitOfWork.UserRepository.GetAll(u => playerIds.Contains(u.Id));
        IEnumerable<string> gameCardNames = Game.Cards.Select(gameCard => gameCard.Name);
        IEnumerable<Card> cards = _unitOfWork.CardRepository.GetAll(c => gameCardNames.Contains(c.Name));
        IEnumerable<UserScore> scores = Game.Players.Select(p => new UserScore()
        {
            Score = p.Score,
            Time = p.TimeSpent,
            User = users.First(u => u.Id == p.User.Id),
        });

        foreach (UserScore score in scores)
            await _unitOfWork.UserScoreRepository.AddAsync(score);

        Game game = new()
        {
            Cards = cards.ToList(),
            PlayingUsers = users.ToList(),
            Scores = scores.ToList(),
        };
        var addedGame = await _unitOfWork.GameRepository.AddAsync(game);

        await _unitOfWork.SaveChangesAsync();
    }
    private void UpdateHostedGames()
    {
        _sessionService.Update(_hostId, Game);
    }

    public void AddPlayer(User user)
    {
        if (Game.Players.Any(p => p.User.Id == user.Id)) throw new InvalidOperationException("User is already in the game");

        Game.Players.Add(new Player(user, Game));
        UpdateHostedGames();
    }
    public Player? GetPlayer(Guid playerId) => Game.Players.FirstOrDefault(p => p.Id == playerId);
    public Player? GetPlayer(User user) => Game.Players.FirstOrDefault(p => p.User.Id == user.Id);
    public void RemovePlayer(Guid userId)
    {
        if (Game.Players.All(p => p.User.Id != userId)) throw new InvalidOperationException("User is not in the game");

        Game.Players.Remove(Game.Players.First(p => p.User.Id == userId));

        // No players left, delete game
        if (!Game.Players.Any())
        {
            DeleteGame();
            return;
        }
        
        // Host left their own game, find new host
        if (Game.Host.User.Id == userId)
        {
            Game.Host = Game.Players.GetRandomItem();
        }
        UpdateHostedGames();
    }
}

