using FlipNow.Common.Entities;

namespace FlipNow.Business.Models;

public class Player
{
    private int _gameCardsAmount;

    public Player(User user, ActiveGame game)
    {
        User = user;
        _gameCardsAmount = game.Cards.Count;
    }

    public Guid Id { get; } = Guid.NewGuid();
    public User User { get; }
    public double Score => CardMatches * 1000 - TimeSpent.Seconds;
    public int CardMatches { get; set; }
    public int CardMatchesLeft => _gameCardsAmount / 2 - CardMatches;
    public bool Finished { get; set; }
    public TimeSpan TimeSpent { get; set; }
}
