namespace FlipNow.Business.Models;

public class Turn
{
    public Player? Player { get; set; }
    public DateTime TurnStarted { get; set; } = DateTime.Now;
    public TimeSpan TimeSpent { get; set; } = new TimeSpan();
}
