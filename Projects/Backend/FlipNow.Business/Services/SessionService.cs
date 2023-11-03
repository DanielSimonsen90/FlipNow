using FlipNow.Business.Models;
using FlipNow.Common.Entities;

namespace FlipNow.Business.Services;

public class GameSessionService
{
    public readonly Dictionary<Guid, ActiveGame> HostedGames = new();
    public readonly Dictionary<string, Guid> ConnectedUsers = new();

    #region Find game
    public ActiveGame? FindActiveGame(string invideCode) => HostedGames.FirstOrDefault(kvp => kvp.Value.InviteCode == invideCode).Value;
    public ActiveGame? FindGameFromUser(User user) => FindGameFromUserId(user.Id);
    public ActiveGame? FindGameFromUserId(Guid userId) => HostedGames.FirstOrDefault(kvp => 
        kvp.Value.Players.Any(p => p.User.Id == userId)
        || kvp.Value.Host.User.Id == userId
    ).Value;
    #endregion

    #region HostedGame CRUD
    public void AddGame(Guid hostId, ActiveGame game) => HostedGames.Add(hostId, game);
    public bool HasGame(Guid userId) => HostedGames.ContainsKey(userId);
    public void Update(Guid hostId, ActiveGame game) => HostedGames[hostId] = game;
    public void RemoveGame(Guid hostId) => HostedGames.Remove(hostId);
    #endregion
    
    #region ConnectedUsers CRUD
    public Guid GetUserIdFromConnectionId(string connectionId) => ConnectedUsers.GetValueOrDefault(connectionId);
    public void AddUserConnection(string connectionId, Guid userId) => ConnectedUsers.Add(connectionId, userId);
    public void RemoveUserConnection(string connectionId) => ConnectedUsers.Remove(connectionId);
    #endregion
}
