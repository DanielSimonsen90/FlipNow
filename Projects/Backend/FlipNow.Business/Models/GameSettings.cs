namespace FlipNow.Business.Models;

public class GameSettings
{
    public GameSettings(string lobbyName, int lobbyLimit, int cards)
    {
        LobbyName = lobbyName;
        LobbyLimit = lobbyLimit;
        Cards = cards;
    }

    public int LobbyLimit { get; set; }
    public string LobbyName { get; set; }
    public int Cards { get; set; }
}
