using FlipNow.Business.Models;
using FlipNow.Business.Services;
using FlipNow.Common.Entities;
using Microsoft.AspNetCore.SignalR;

namespace FlipNow.Business.Hubs;

public class GamesHub : Hub, IGamesHub
{
    public const string ENDPOINT = "gameshub";
    
    private readonly UnitOfWork _uow;
    private readonly GameSessionService _sessionService;

    public GamesHub(UnitOfWork uow, GameSessionService sessionService)
    {
        _uow = uow;
        _sessionService = sessionService;

    }

    // "Events" are methods that can be called from the client

    #region Connection lifecycle
    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        Guid userId = _sessionService.GetUserIdFromConnectionId(Context.ConnectionId);
        ActiveGame? game = _sessionService.FindGameFromUserId(userId);
        if (game is null) return;

        Player? player = game.Players.FirstOrDefault(p => p.User.Id == userId);
        if (player is null) return;

        await Log("Client disconnect", GamesHubConstants.EVENTS_LEAVE_GAME, game.InviteCode, $"{player.User.Username} lost connection to the game. " + (exception is not null ? exception.Message : ""));

        await LeaveGame(game.InviteCode, player.Id.ToString());
    }
    #endregion

    #region Game lifecycle
    public Task StartGame(string inviteCode) => UseActiveGame(inviteCode, GamesHubConstants.EVENTS_START_GAME, async (players, service) =>
    {
        service.StartGame();
        return await Task.FromResult(service.Game);
    });
    public Task EndGame(string inviteCode) => UseActiveGame(inviteCode, GamesHubConstants.EVENTS_END_GAME, async (players, service) =>
    {
        service.EndGame();
        return await Task.FromResult(service.Game);
    });
    public Task DeleteGame(string inviteCode) => UseActiveGame(inviteCode, GamesHubConstants.EVENTS_DELETE_GAME, async (players, service) =>
    {
        service.DeleteGame();
        return await Task.FromResult(service.Game);
    });
    #endregion

    #region PlayerPresence (Join/Leave)
    public Task JoinGame(string inviteCode, string userId) => UseActiveGame(inviteCode, GamesHubConstants.EVENTS_JOIN_GAME, async (players, service) =>
    {
        if (string.IsNullOrEmpty(userId)) throw new ArgumentNullException(nameof(userId), "UserId cannot be null or empty.");
        if (!service.CanAddPlayer) throw new InvalidOperationException("There are too many players in this game!");
        
        User user = await _uow.UserRepository.GetAsync(Guid.Parse(userId));
        Player? player = service.GetPlayer(user);
        if (player is not null) throw new InvalidOperationException("Player already joined.");

        ActiveGame? existingPlayerGame = _sessionService.FindGameFromUser(user);
        if (existingPlayerGame is not null) throw new InvalidOperationException("Player already in a game.");

        service.AddPlayer(user);
        _sessionService.AddUserConnection(Context.ConnectionId, user.Id);
        //await Groups.AddToGroupAsync(Context.ConnectionId, inviteCode);
        return service.Game;
    });
    public Task LeaveGame(string inviteCode, string playerId) => UseActiveGame(inviteCode, GamesHubConstants.EVENTS_LEAVE_GAME, async (players, service) =>
    {
        if (string.IsNullOrEmpty(playerId)) throw new ArgumentNullException(nameof(playerId), "PlayerId cannot be null or empty.");
        Player player = service.GetPlayer(Guid.Parse(playerId)) ?? throw new NullReferenceException("Player not found");

        service.RemovePlayer(player.User.Id);
        _sessionService.RemoveUserConnection(Context.ConnectionId);
        //await Groups.RemoveFromGroupAsync(Context.ConnectionId, inviteCode);
        return service.Game;
    });
    #endregion

    #region Game Updates
    public Task FlipCard(string inviteCode, int cardIndex) => UseActiveGame(inviteCode, GamesHubConstants.EVENTS_FLIP_CARD, async (players, service) =>
    {
        // -1 was given from client timeout
        if (cardIndex > -1) service.FlipCard(cardIndex);
        else
        {
            Player currentTurnPlayer = service.ForceChangeTurn();
            await Log("Sending turn change", GamesHubConstants.EVENTS_TURN_EXPIRED, inviteCode);
            await players.SendAsync(GamesHubConstants.EVENTS_TURN_EXPIRED, inviteCode, service.Game, currentTurnPlayer);
        }
        
        return await Task.FromResult(service.Game);
    });
    #endregion

    private delegate Task<ActiveGame> UseActiveGameContext(IClientProxy players, GameService service);
    private async Task UseActiveGame(string inviteCode, string eventName, UseActiveGameContext callback)
    {
        try
        {
            //IClientProxy players = Clients.Group(inviteCode);
            IClientProxy players = Clients.All;
            ActiveGame game = _sessionService.FindActiveGame(inviteCode) ?? throw new NullReferenceException("Game not found");
            GameService service = new(_uow, _sessionService, game);

            await Log("Received request", eventName, inviteCode);

            ActiveGame updatedGame = await callback(players, service);
            //players = Clients.Group(inviteCode); // Redefine players incase of update

            // TODO: Check if updatedGame != game

            await Log("Sending response", eventName, inviteCode);
            await players.SendAsync(eventName, inviteCode, updatedGame);

            if (updatedGame.PlayState == PlayState.PLAYING)
            {
                updatedGame = await service.ProcessGame();
                string eventUpdateName = updatedGame.PlayState == PlayState.ENDED
                    ? GamesHubConstants.EVENTS_END_GAME
                    : GamesHubConstants.EVENTS_UPDATE_GAME;

                await Log("Sending update", eventUpdateName, inviteCode, $"Updated from {eventName}");
                await players.SendAsync(eventUpdateName, inviteCode, updatedGame);
            }
        }
        catch (Exception ex)
        {
            await Log("Failed", eventName, inviteCode, ex.Message);
            await Clients.Caller.SendAsync(GamesHubConstants.RESPONSE_FAILED, inviteCode, ex.Message);
        }
    }

    private async Task Log(string type, string eventName, string? inviteCode, string message = "")
        => await Clients.All.SendAsync(GamesHubConstants.LOG, inviteCode, DateTime.Now,
            $"{type} \"{eventName}\" from game {inviteCode}" + (string.IsNullOrEmpty(message) ? "" : $": {message}"));
}
