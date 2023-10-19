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

    public ActiveGame Game { get; set; }
    public bool Flipped { get; set; }
}
