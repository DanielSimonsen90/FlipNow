using FlipNow.Business.Services;
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
    private readonly GamesHubService _service;

    public GamesHub(GamesHubService service)
    {
        _service = service;
    }

    // "Events" are methods that can be called from the client

    #region Game lifecycle
    public Task StartGame(string? inviteCode) => _service.StartGame(inviteCode);
    public Task EndGame(string? inviteCode) => _service.EndGame(inviteCode);
    #endregion

    #region PlayerPresence (Join/Leave)
    public Task JoinGame(string? inviteCode, string? userId) => _service.JoinGame(inviteCode, userId);
    public Task LeaveGame(string? inviteCode, string? playerId) => _service.LeaveGame(inviteCode, playerId);
    #endregion

    #region Game Updates
    public Task FlipCard(string? inviteCode, int? cardIndex) => _service.FlipCard(inviteCode, cardIndex);
    #endregion
}
