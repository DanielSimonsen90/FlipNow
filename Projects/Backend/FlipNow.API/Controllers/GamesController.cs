using FlipNow.Business.Models;
using FlipNow.Business.Services;
using FlipNow.Common.Entities;
using Microsoft.AspNetCore.Mvc;

namespace FlipNow.API.Controllers;

public class GamesController : BaseController
{
    private const string INVITE_PREFIX = API_URL + "games/";

    public GamesController(UnitOfWork unitOfWork) : base(unitOfWork) { }

    [HttpPost]
    public IActionResult CreateGame(Guid? hostId)
    {
        if (hostId is not Guid userId) return BadQueryRequest(nameof(hostId));

        // Define host in try/catch, as it is possible for repository not to find user by userId
        IActionResult? getHostResult = TryGetObject(
            () => _unitOfWork.UserRepository.Get(userId), 
            NotFound, 
            out User? host);
        
        if (getHostResult is not null 
            || host is null) 
            return getHostResult ?? InternalServerError();

        // Define GameService in try/catch, as it is possible for GameService constructor to throw InvalidOperationException (user is already hosting a game)
        IActionResult? getGameServiceResult = TryGetObject(
            () => new GameService(_unitOfWork, INVITE_PREFIX, host), 
            exMsg => Forbid(exMsg), 
            out GameService? gameService);
        if (getGameServiceResult is not null 
            || gameService is null) 
            return getGameServiceResult ?? InternalServerError();

        return Created(gameService.Game.InviteUrl, gameService);
    }

    [HttpPost("{inviteCode}")] public IActionResult JoinGame(string inviteCode, Guid? userId) => ModifyPlayerPresence(inviteCode, userId, shouldBePresent: true);
    [HttpDelete("{inviteCode}")] public IActionResult LeaveGame(string inviteCode, Guid? userId) => ModifyPlayerPresence(inviteCode, userId, shouldBePresent: false);

    private IActionResult ModifyPlayerPresence(string inviteCode, Guid? userId, bool shouldBePresent)
    {
        var result = GetGameAndUser(inviteCode, userId,
            out ActiveGame? game, out User? user);

        if (result is not null
            || game is null
            || user is null)
            return result ?? InternalServerError();

        var gameService = new GameService(_unitOfWork, game);

        try
        {
            if (shouldBePresent) gameService.AddPlayer(user);
            else gameService.RemovePlayer(user);
        }
        catch (Exception ex)
        {
            return Ok(ex.Message);
        }

        return Ok(gameService.Game);
    }

    private IActionResult? GetGameAndUser(string inviteCode, Guid? userId,
        out ActiveGame? game, out User? user)
    {
        user = null;
        game = GameService.FindActiveGame(inviteCode);

        if (game is null) return NotFound("Game not found");
        if (userId is not Guid playerId) return BadQueryRequest(nameof(userId));

        try { user = _unitOfWork.UserRepository.Get(playerId); }
        catch (Exception ex) { return NotFound(ex.Message); }

        return null;
    }
}
