using FlipNow.Common.Entities;

namespace FlipNow.Business.Models;

public class GameCard
{
    public GameCard(Card card)
    {
        Name = card.Name;
    }
    
    /// <summary>
    /// Name of the card. Uses <see cref="Card.Name"/>
    /// </summary>
    public string Name { get; }

    public bool Flipped { get; set; } = false;
    public DateTime? FlippedTimestamp { get; set; }

    public Player? MatchedBy { get; set; }
    public bool Matched => Flipped && MatchedBy is not null;
}
