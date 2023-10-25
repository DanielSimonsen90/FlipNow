using FlipNow.Business.Hubs;
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

    [HttpGet]
    public IActionResult GetGame(string? userId)
    {
        if (string.IsNullOrEmpty(userId)) return BadQueryRequest(nameof(userId));
        
        Guid id = Guid.Parse(userId);
        User? user = _unitOfWork.UserRepository.Get(id);
        if (user is null) return NotFound($"User with id {userId} not found.");

        ActiveGame? game = GameService.FindGameFromUser(user);
        return Ok(game);
    }
}
