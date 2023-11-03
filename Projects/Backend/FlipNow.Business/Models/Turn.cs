namespace FlipNow.Business.Models;

public class Turn
{
    public const int TURN_TIMEOUT_S = 30; // You get 30s to finish your turn

    public Turn(Player player)
    {
        Player = player;
    }

    public Player Player { get; set; }
    public DateTime TurnStarted { get; set; } = DateTime.Now;
    public int Count { get; set; } = 1;
    public int Timeout => TURN_TIMEOUT_S;
}
