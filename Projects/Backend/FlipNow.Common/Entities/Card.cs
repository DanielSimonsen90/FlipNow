#nullable disable
using DanhoLibrary.NLayer;

namespace FlipNow.Common.Entities;

public class Card : BaseEntity<Guid>
{
    public string Name { get; set; }
    public ICollection<Game> Games { get; set; }
}
