namespace FlipNow.Business;

public class GamesHubConstants
{
    #region Game Events
    public const string EVENTS_GAME_SETTINGS_UPDATE = "gameSettingsUpdated";
    public const string EVENTS_START_GAME = "gameStarted";

    public const string EVENTS_UPDATE_GAME = "gameUpdated";
    public const string EVENTS_FLIP_CARD = "cardFlipped";
    public const string EVENTS_TURN_EXPIRED = "turnExpired";

    //public const string EVENTS_RESET_GAME = "gameReset";
    public const string EVENTS_END_GAME = "gameEnded";
    public const string EVENTS_DELETE_GAME = "gameDeleted";

    public const string EVENTS_JOIN_GAME = "playerJoined";
    public const string EVENTS_LEAVE_GAME = "playerLeft";
    #endregion

    #region User Events
    public const string EVENTS_USER_LOGIN = "userLoggedIn";
    public const string EVENTS_USER_LOGOUT = "userLoggedOut";
    #endregion

    #region System Events
    public const string RESPONSE_FAILED = "broadcastFailed";
    public const string LOG = "log";
    #endregion
}
