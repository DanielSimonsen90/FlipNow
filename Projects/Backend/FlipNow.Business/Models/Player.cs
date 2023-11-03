using FlipNow.Common.DTOs;
using FlipNow.Common.Entities;
using Mapster;

namespace FlipNow.Business.Models;

public class Player
{
    private readonly int _gameCardsAmount;

    public Player(User user, ActiveGame game)
    {
        User = user.Adapt<UserDTO>();
        _gameCardsAmount = game.Cards.Count;
    }

    public Guid Id { get; } = Guid.NewGuid();
    public UserDTO User { get; }
    public double Score
    {
        get
        {
            double score = CardMatches * 1000 - TimeSpentTotal.Seconds;
            if (score < 0) score = 0;
            return score;
        }
    }
    public int CardMatches { get; set; } = 0;
    public int CardMatchesLeft => _gameCardsAmount / 2 - CardMatches;
    public TimeSpan TimeSpentTotal { get; set; } // TODO: Implement TimeSpent
}
