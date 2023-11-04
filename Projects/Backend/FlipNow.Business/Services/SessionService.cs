using FlipNow.Business.Models;
using FlipNow.Common.Entities;

namespace FlipNow.Business.Services;

public class GameSessionService
{
    public readonly Dictionary<Guid, GameService> HostedGames = new();
    public readonly Dictionary<string, Guid> ConnectedUsers = new();

    #region Find game
    public ActiveGame? FindActiveGame(string invideCode) => HostedGames.FirstOrDefault(kvp => kvp.Value.Game.InviteCode == invideCode).Value?.Game;
    public ActiveGame? FindGameFromUser(User user) => FindGameFromUserId(user.Id);
    public ActiveGame? FindGameFromUserId(Guid userId) => HostedGames.FirstOrDefault(kvp => 
        kvp.Value.Game.Players.Any(p => p.User.Id == userId)
        || kvp.Value.Game.Host.User.Id == userId
    ).Value?.Game;
    #endregion

    #region HostedGame CRUD
    public void AddGame(Guid hostId, GameService gameService) => HostedGames.Add(hostId, gameService);
    public bool HasGame(Guid userId) => HostedGames.ContainsKey(userId);
    public void Update(Guid hostId, GameService gameService) => HostedGames[hostId] = gameService;
    public void RemoveGame(Guid hostId) => HostedGames.Remove(hostId);
    #endregion
    
    #region ConnectedUsers CRUD
    public Guid GetUserIdFromConnectionId(string connectionId) => ConnectedUsers.GetValueOrDefault(connectionId);
    public void AddUserConnection(string connectionId, Guid userId) => ConnectedUsers.Add(connectionId, userId);
    public void RemoveUserConnection(string connectionId) => ConnectedUsers.Remove(connectionId);
    #endregion
}
