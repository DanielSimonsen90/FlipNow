using DanhoLibrary.Extensions;
using FlipNow.Business.Models;
using FlipNow.Common.Entities;

namespace FlipNow.Business.Services;

public class GameService
{
    public static readonly Dictionary<Guid, ActiveGame> HostedGames = new();
    public static ActiveGame FindActiveGame(string invideCode) => HostedGames.FirstOrDefault(kvp => kvp.Value.InviteCode == invideCode).Value;
    private static bool IsNotMatch(GameCard first, GameCard second) => first.Name != second.Name;

    public ActiveGame Game { get; private set; }

    private readonly UnitOfWork _unitOfWork;
    private readonly Guid _hostId;

    public GameService(UnitOfWork unitOfWork, string invitePrefix, User host)
    {
        if (HostedGames.ContainsKey(host.Id)) throw new InvalidOperationException("User is already hosting a game");

        _unitOfWork = unitOfWork;
        Game = new ActiveGame(
            invitePrefix,
            cards: _unitOfWork.CardRepository.GetAllShuffled(),
            host);

        _hostId = host.Id;
    }

    public GameService(UnitOfWork unitOfWork, ActiveGame game)
    {
        _unitOfWork = unitOfWork;
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

        Game.PlayState = PlayState.IDLE;
        HostedGames.Remove(_hostId);
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

    public void FlipCard(int index)
    {
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
        IEnumerable<Card> cards = _unitOfWork.CardRepository.GetAll(c => Game.Cards.Any(gc => gc.Name == c.Name));
        IEnumerable<UserScore> scores = Game.Players.Select(p => new UserScore()
        {
            Score = p.Score,
            Time = p.TimeSpent,
            User = p.User
        });

        await _unitOfWork.UserScoreRepository.AddRangeAsync(scores.ToArray());
        await _unitOfWork.GameRepository.AddAsync(new()
        {
            Cards = cards,
            PlayingUsers = Game.Players.Select(p => p.User),
            Scores = scores,
            WinnerScore = scores.OrderByDescending(s => s.Score).First()
        });

        await _unitOfWork.SaveChangesAsync();
    }
    private void UpdateHostedGames()
    {
        HostedGames.Set(_hostId, Game);
    }

    public void AddPlayer(User user)
    {
        if (Game.Players.Any(p => p.User.Id == user.Id)) throw new InvalidOperationException("User is already in the game");

        Game.Players.Add(new Player(user, Game));
        UpdateHostedGames();
    }
    public void RemovePlayer(User user)
    {
        if (Game.Players.All(p => p.User.Id != user.Id)) throw new InvalidOperationException("User is not in the game");

        Game.Players.Remove(Game.Players.First(p => p.User.Id == user.Id));
        UpdateHostedGames();
    }
}

