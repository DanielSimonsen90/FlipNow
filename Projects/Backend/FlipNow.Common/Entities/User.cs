using DanhoLibrary.NLayer;
#nullable disable

namespace FlipNow.Common.Entities;

public class User : BaseEntity<Guid>
{
    public string Username { get; set; }
    public double AvgScore { get; set; } = 0;
    
    public IEnumerable<UserScore> Scores { get; set; }
    public UserScore HighestScore { get; set; }
    public Game ActiveGame { get; set; }
}
