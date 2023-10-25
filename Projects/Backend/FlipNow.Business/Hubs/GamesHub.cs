using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlipNow.Business.Hubs;

public class GamesHub : Hub, IGamesHub
{
    public const string ENDPOINT = "gameshub";
    
    // "Events" are methods that can be called from the client

    #region Game lifecycle
    public async Task StartGame(string gameId)
    {
        await Clients.Group(gameId).SendAsync("GameStarted");
    }

    public async Task ResetGame(string gameId)
    {
        await Clients.Group(gameId).SendAsync("GameReset");
    }

    public async Task EndGame(string gameId)
    {
        await Clients.Group(gameId).SendAsync("GameEnded");
    }
    #endregion

    #region PlayerPresence (Join/Leave)
    public async Task JoinGame(string gameId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, gameId);
        await Clients.Group(gameId).SendAsync("PlayerJoined", Context.ConnectionId);
    }

    public async Task LeaveGame(string gameId)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, gameId);
        await Clients.Group(gameId).SendAsync("PlayerLeft", Context.ConnectionId);
    }
    #endregion

    #region Game Updates
    public async Task FlipCard(string gameId, int cardIndex)
    {
        await Clients.Group(gameId).SendAsync("CardFlipped", cardIndex);
    }

    public async Task UpdateScore(string gameId, double score)
    {
        await Clients.Group(gameId).SendAsync("ScoreUpdated", score);
    }

    public async Task UpdateMoves(string gameId, int moves)
    {
        await Clients.Group(gameId).SendAsync("MovesUpdated", moves);
    }
    #endregion


}
