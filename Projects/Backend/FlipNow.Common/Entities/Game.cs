using DanhoLibrary.NLayer;

namespace FlipNow.Common.Entities;
#nullable disable

public class Game : BaseEntity<Guid>
{
    public ICollection<UserScore> Scores { get; set; }
    public ICollection<User> PlayingUsers { get; set; }
    public ICollection<Card> Cards { get; set; }
    public DateTime SavedTimestamp { get; set; } = DateTime.UtcNow;
}
