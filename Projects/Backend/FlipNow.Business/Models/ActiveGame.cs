using FlipNow.Common.Entities;

namespace FlipNow.Business.Models;

public class ActiveGame
{
    public ActiveGame(string invitePrefix, IEnumerable<Card> cards, IEnumerable<Player> players, Player host)
    {
        _invitePrefix = invitePrefix;
        Cards = cards.Select(c => new GameCard(c)).ToList();
        Players = players.ToList();
        Host = host;
    }

    #region Invite
    private readonly string _invitePrefix;
    public string InviteCode { get; set; } = Guid.NewGuid().ToString();
    public string InviteUrl => FlipNowHelper.EnsureSlash(_invitePrefix, start: false) + InviteCode;
    #endregion

    #region Players
    public List<Player> Players { get; }
    public int TurnPlayerIndex { get; set; } = 0;
    public Player TurnPlayer => Players[TurnPlayerIndex];
    public Player Host { get; }
    public List<Player> Leaderboard => Players.OrderByDescending(p => p.Score).ToList();
    #endregion

    public List<GameCard> Cards { get; }
    public PlayState PlayState { get; set; } = PlayState.IDLE;
}
