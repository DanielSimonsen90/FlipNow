using DanhoLibrary.NLayer;
#nullable disable

namespace FlipNow.Common.Entities;

public class UserScore : BaseEntity<Guid>
{
    public User User { get; set; }
    public double Score { get; set; }
    public Game Game { get; set; }
    public TimeSpan Time { get; set; }
}
