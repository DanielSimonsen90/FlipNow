using FlipNow.Business.Services;
using FlipNow.Common.Entities;

namespace FlipNow.Business.Models;

public class ActiveGame
{
    public ActiveGame(IEnumerable<Card> cards, User host)
    {
        Cards = cards.Select(c => new GameCard(c)).ToList();
        Host = new Player(host, this);
        Players = new List<Player>() { Host };
        Turn = new Turn(Host);
    }

    public string InviteCode { get; } = Guid.NewGuid().ToString();
    public int MaxPlayersAllowed { get; } = GameService.MAX_PLAYERS_ALLOWED;

    #region Players
    public List<Player> Players { get; }

    private int _turnPlayerIndex = 0;
    public int TurnPlayerIndex 
    {
        get => _turnPlayerIndex;
        set 
        {
            if (value < 0 || Players.Count <= value) throw new ArgumentOutOfRangeException(nameof(value), value, "Index out of range");
            _turnPlayerIndex = value;
        } 
    }
    public Turn Turn { get; }
    public Player Host { get; internal set; }
    public List<Player> Leaderboard => Players.OrderByDescending(p => p.Score).ToList();
    #endregion

    public List<GameCard> Cards { get; internal set; }
    public PlayState PlayState { get; set; } = PlayState.IDLE;
}
