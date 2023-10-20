using System.ComponentModel.DataAnnotations.Schema;
#nullable disable

namespace FlipNow.Common.Entities;

public class CardGame
{
    [ForeignKey(nameof(Card))]
    public Guid CardId { get; set; }
    public Card Card { get; set; }

    [ForeignKey(nameof(Game))]
    public Guid GameId { get; set; }
    public Game Game { get; set; }
}
