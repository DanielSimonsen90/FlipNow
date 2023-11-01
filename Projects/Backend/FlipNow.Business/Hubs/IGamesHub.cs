namespace FlipNow.Business.Hubs;

public interface IGamesHub
{
    #region Game lifecycle
    Task StartGame(string inviteCode);
    Task EndGame(string inviteCode);
    #endregion

    #region PlayerPresence (Join/Leave)
    Task JoinGame(string inviteCode, string userId);
    Task LeaveGame(string inviteCode, string playerId);
    #endregion

    #region Game Updates
    Task FlipCard(string inviteCode, int cardIndex);
    #endregion
}
