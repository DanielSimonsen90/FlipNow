using FlipNow.Business.Hubs;
using FlipNow.Business.Models;
using FlipNow.Common.Entities;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore.Diagnostics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlipNow.Business.Services;

public class GamesHubService : IGamesHub
{
    private readonly UnitOfWork _uow;
    
    private readonly IHubCallerClients _clients;
    private readonly IGroupManager _groups;
    private readonly HubCallerContext _context;

    public GamesHubService(UnitOfWork uow, Hub hub)
    {
        _uow = uow;
        
        _clients = hub.Clients;
        _groups = hub.Groups;
        _context = hub.Context;
    }

    #region Game lifecycle
    public Task StartGame(string? inviteCode) => UseActiveGame(inviteCode, GamesHubConstants.EVENTS_START_GAME, async (players, service) =>
    {
        service.StartGame();
        return await Task.FromResult(service.Game);
    });

    public Task EndGame(string? inviteCode) => UseActiveGame(inviteCode, GamesHubConstants.EVENTS_END_GAME, async (players, service) =>
    {
        service.EndGame();
        return await Task.FromResult(service.Game);
    });
    #endregion

    #region PlayerPresence (Join/Leave)
    public Task JoinGame(string? inviteCode, string? userId) => UseActiveGame(inviteCode, GamesHubConstants.EVENTS_JOIN_GAME, async (players, service) =>
    {
        if (string.IsNullOrEmpty(userId)) throw new ArgumentNullException(nameof(userId), "UserId cannot be null or empty.");
        User user = await _uow.UserRepository.GetAsync(Guid.Parse(userId));

        Player? player = service.GetPlayer(user);
        if (player is not null) throw new InvalidOperationException("Player already joined.");

        ActiveGame? existingPlayerGame = GameService.FindGameFromUser(user);
        if (existingPlayerGame is not null) throw new InvalidOperationException("Player already in a game.");

        service.AddPlayer(user);
        await _groups.AddToGroupAsync(_context.ConnectionId, inviteCode);
        await _clients.Group(inviteCode).SendAsync("PlayerJoined", _context.ConnectionId);
        return service.Game;
    });

    public Task LeaveGame(string? inviteCode, string? playerId) => UseActiveGame(inviteCode, GamesHubConstants.EVENTS_LEAVE_GAME, async (players, service) =>
    {
        if (string.IsNullOrEmpty(playerId)) throw new ArgumentNullException(nameof(playerId), "PlayerId cannot be null or empty.");
        Player player = service.GetPlayer(Guid.Parse(playerId)) ?? throw new NullReferenceException("Player not found");

        service.RemovePlayer(player.User.Id);
        await _groups.RemoveFromGroupAsync(_context.ConnectionId, inviteCode);
        await _clients.Group(inviteCode).SendAsync("PlayerLeft", _context.ConnectionId);
        return service.Game;
    });
    #endregion

    #region Game Updates
    public Task FlipCard(string? inviteCode, int? cardIndex) => UseActiveGame(inviteCode, GamesHubConstants.EVENTS_UPDATE_GAME, async (players, service) =>
    {
        if (cardIndex is not int index) throw new ArgumentNullException(nameof(cardIndex), $"{nameof(cardIndex)} not provided.");

        service.FlipCard(index);
        return await Task.FromResult(service.Game);
    });
    #endregion

    private delegate Task<ActiveGame> UseActiveGameContext(IClientProxy players, GameService service);
    private async Task UseActiveGame(string? inviteCode, string eventName, UseActiveGameContext callback)
    {
        try
        {
            if (string.IsNullOrEmpty(inviteCode)) throw new ArgumentException("Invalid game invite code");

            IClientProxy players = _clients.Group(inviteCode);
            ActiveGame game = GameService.FindActiveGame(inviteCode) ?? throw new NullReferenceException("Game not found");
            GameService service = new(_uow, game);
            ActiveGame updatedGame = await callback(players, service);

            // TODO: Check if updatedGame != game

            await players.SendAsync(eventName, updatedGame);

            if (updatedGame.PlayState == PlayState.PLAYING)
            {
                updatedGame = await service.ProcessGame();
                await players.SendAsync(updatedGame.PlayState == PlayState.ENDED 
                    ? GamesHubConstants.EVENTS_END_GAME 
                    : GamesHubConstants.EVENTS_UPDATE_GAME, 
                    updatedGame);
            }
        }
        catch (Exception ex)
        {
            await _clients.Caller.SendAsync(GamesHubConstants.RESPONSE_FAILED, ex.Message);
        }
    }
}
