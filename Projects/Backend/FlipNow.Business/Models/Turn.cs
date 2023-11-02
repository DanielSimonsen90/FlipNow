namespace FlipNow.Business.Models;

public class Turn
{
    public Turn(Player player)
    {
        Player = player;
    }

    public Player Player { get; set; }
    public DateTime TurnStarted { get; set; } = DateTime.Now;
}
