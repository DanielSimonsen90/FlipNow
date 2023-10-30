using FlipNow.Business.Models;
using FlipNow.Common.Entities;

namespace FlipNow.Business.Services;

public class GameSessionService
{
    public readonly Dictionary<Guid, ActiveGame> HostedGames = new();
    public ActiveGame? FindActiveGame(string invideCode) => HostedGames.FirstOrDefault(kvp => kvp.Value.InviteCode == invideCode).Value;
    public ActiveGame? FindGameFromUser(User user) => HostedGames.FirstOrDefault(kvp => kvp.Value.Players.Any(p => p.User.Id == user.Id)).Value;

    public void AddGame(Guid hostId, ActiveGame game) => HostedGames.Add(hostId, game);
    public bool HasGame(Guid userId) => HostedGames.ContainsKey(userId);
    public void Update(Guid hostId, ActiveGame game) => HostedGames[hostId] = game;
    public void RemoveGame(Guid hostId) => HostedGames.Remove(hostId);
}
