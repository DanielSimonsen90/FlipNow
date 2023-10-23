﻿using FlipNow.Common.Entities;

namespace FlipNow.Business.Models;

public class ActiveGame
{
    public ActiveGame(string invitePrefix, IEnumerable<Card> cards, User host)
    {
        _invitePrefix = invitePrefix;
        Cards = cards.Select(c => new GameCard(c)).ToList();
        Host = new Player(host, this);
        Players = new List<Player>() { Host };
    }

    #region Invite
    private readonly string _invitePrefix;
    public string InviteCode { get; } = Guid.NewGuid().ToString();
    public string InviteUrl => FlipNowHelper.EnsureSlash(_invitePrefix, start: false) + InviteCode;
    #endregion

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
    public Player TurnPlayer => Players[TurnPlayerIndex];
    public Player Host { get; }
    public List<Player> Leaderboard => Players.OrderByDescending(p => p.Score).ToList();
    #endregion

    public List<GameCard> Cards { get; internal set; }
    public PlayState PlayState { get; set; } = PlayState.IDLE;
}