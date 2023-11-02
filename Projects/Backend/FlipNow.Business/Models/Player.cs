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
    public double Score => CardMatches * 1000 - TimeSpentTotal.Seconds;
    public int CardMatches { get; set; } = 0;
    public int CardMatchesLeft => _gameCardsAmount / 2 - CardMatches;
    public bool Finished { get; set; }
    public TimeSpan TimeSpentTurn { get; set; }
    public TimeSpan TimeSpentTotal { get; set; } // TODO: Implement TimeSpent
}
