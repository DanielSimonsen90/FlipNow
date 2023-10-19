namespace FlipNow.Common.Entities;
#nullable disable

public class Game
{
    public UserScore WinnerScore { get; set; }
    public IEnumerable<UserScore> Scores { get; set; }
    public IEnumerable<User> PlayingUsers { get; set; }
    public IEnumerable<Card> Cards { get; set; }
}
