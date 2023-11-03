using FlipNow.Business.Hubs;
using FlipNow.Business.Models;
using FlipNow.Business.Services;
using FlipNow.Common.Entities;
using Mapster;
using Microsoft.AspNetCore.Mvc;

namespace FlipNow.API.Controllers;

public class GamesController : BaseController
{
    private readonly GameSessionService _sessionService;
    private const string ADMIN_KEY = "dev";

    public GamesController(UnitOfWork unitOfWork, GameSessionService sessionService) : base(unitOfWork) 
    {
        _sessionService = sessionService;
    }

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
            () => new GameService(_unitOfWork, _sessionService, host), 
            exMsg => Forbid(exMsg), 
            out GameService? gameService);
        if (getGameServiceResult is not null 
            || gameService is null) 
            return getGameServiceResult ?? InternalServerError();

        return Created(gameService.Game.InviteCode, gameService.Game);
    }

    [HttpGet]
    public IActionResult GetGame(string? userId)
    {
#if !DEBUG
        if (string.IsNullOrEmpty(userId)) return BadQueryRequest(nameof(userId));
#else
        if (string.IsNullOrEmpty(userId)) return Ok(_unitOfWork.GameRepository.GetAllWithRelations(
            g => g.PlayingUsers,
            g => g.Cards,
            g => g.Scores));
#endif
        Guid id = Guid.Parse(userId);
        User? user = _unitOfWork.UserRepository.GetWithRelations(id, 
            u => u.Scores);
        if (user is null) return NotFound($"User with id {userId} not found.");

        ActiveGame? game = _sessionService.FindGameFromUser(user);
        return Ok(game);
    }

    [HttpGet("active")]
    public IActionResult GetAllActive(string key)
    {
        if (key != ADMIN_KEY) return NotFound();
        return Ok(_sessionService.HostedGames);
    }
}
