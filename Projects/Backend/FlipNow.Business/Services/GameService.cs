using DanhoLibrary.Extensions;
using FlipNow.Business.Models;
using FlipNow.Common.Entities;

namespace FlipNow.Business.Services;

public class GameService
{
    private static bool IsNotMatch(GameCard first, GameCard second) => first.Name != second.Name;
    
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
            cards: _unitOfWork.CardRepository.GetAllShuffled(),
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
    }

    public void StartGame()
    {
        if (Game.PlayState == PlayState.PLAYING) throw new InvalidOperationException("Game is already playing");

        ResetGame();
        Game.PlayState = PlayState.PLAYING;
    }
    public void EndGame()
    {
        if (Game.PlayState != PlayState.PLAYING) throw new InvalidOperationException("Game is not playing");

        Game.PlayState = PlayState.ENDED;
        _sessionService.RemoveGame(_hostId);
    }
    private void ResetGame()
    {
        if (Game.TurnPlayerIndex > 0)
            Game.TurnPlayerIndex = 0;

        if (Game.Cards.Any(c => c.Flipped))
            Game.Cards = Game.Cards.Select(gc =>
            {
                gc.Flipped = false;
                return gc;
            }).ToList();

        UpdateHostedGames();
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
        if (Game.Cards.All(card => card.Flipped)) throw new InvalidOperationException("All cards are flipped");

        // Should check card match
        List<GameCard> unmatchedFlippedCards = Game.Cards.Where(c => c.Flipped && !c.Matched).ToList();
        if (unmatchedFlippedCards.Count <= 1) return Game; // Don't check match

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

        // Check game finish
        if (Game.Cards.All(card => card.Matched))
        {
            EndGame();
            await SaveGameAsync();
        }

        UpdateHostedGames();
        return Game;
    }

    private async Task SaveGameAsync()
    {
        IEnumerable<Guid> playerIds = Game.Players.Select(p => p.Id);
        IEnumerable<User> users = _unitOfWork.UserRepository.GetAll(u => playerIds.Contains(u.Id));
        IEnumerable<Card> cards = _unitOfWork.CardRepository.GetAll(c => Game.Cards.Any(gc => gc.Name == c.Name));
        IEnumerable<UserScore> scores = Game.Players.Select(p => new UserScore()
        {
            Score = p.Score,
            Time = p.TimeSpent,
            User = users.First(u => u.Id == p.Id),
        });

        await _unitOfWork.UserScoreRepository.AddRangeAsync(scores.ToArray());
        await _unitOfWork.GameRepository.AddAsync(new()
        {
            Cards = cards,
            PlayingUsers = users,
            Scores = scores,
        });

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
        UpdateHostedGames();
    }
}

