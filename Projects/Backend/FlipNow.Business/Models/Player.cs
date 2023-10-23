﻿using FlipNow.Common.Entities;

namespace FlipNow.Business.Models;

public class Player
{
    public Player(User user, ActiveGame game)
    {
        User = user;
        Game = game;
    }

    public User User { get; }
    public ActiveGame Game { get; }
    public double Score => CardMatches * 1000 - TimeSpent.Seconds;
    public int CardMatches { get; set; }
    public int CardMatchesLeft => Game.Cards.Count / 2 - CardMatches;
    public bool Finished { get; set; }
    public TimeSpan TimeSpent { get; set; }
}