using DanhoLibrary.NLayer;
#nullable disable

namespace FlipNow.Entities.Entities;

public class User : BaseEntity<Guid>
{
    public string Username { get; set; }
    public UserScore HighestScore { get; set; }
    public double AvgScore { get; set; }
}
