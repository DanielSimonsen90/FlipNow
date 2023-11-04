using FlipNow.Business.Services;
using FlipNow.Common.Entities;
using Microsoft.AspNetCore.Mvc;

namespace FlipNow.API.Controllers;

public class UsersController : BaseController
{
    private readonly GameSessionService _sessionService;

    public UsersController(UnitOfWork unitOfWork, GameSessionService sessionService) : base(unitOfWork)
    {
        this._sessionService = sessionService;
    }

    [HttpPost("{username}"), HttpGet("{username}")]
    public async Task<IActionResult> CreateOrFindUser(string username)
    {
        User? user = _unitOfWork.UserRepository.GetByUsername(username);
        if (user is not null) return Ok(user);

        user = await _unitOfWork.UserRepository.AddAsync(new User() { Username = username });
        await _unitOfWork.SaveChangesAsync();
        return Created($"/api/users/{username}", user);
    }

    [HttpDelete("{userId:Guid}")]
    public async Task<IActionResult> DeleteUser(Guid userId)
    {
        User? user = _unitOfWork.UserRepository.Get(userId);
        if (user is null) return NotFound($"User with id {userId} not found.");

        _unitOfWork.UserRepository.Delete(user);
        await _unitOfWork.SaveChangesAsync();
        return Ok($"{user.Username} deleted.");
    }

#if DEBUG
    [HttpGet]
    public async Task<IActionResult> GetAllUsers() => await Task.FromResult(Ok(_unitOfWork.UserRepository.GetAll()));

    [HttpGet("connections")]
    public async Task<IActionResult> GetAllConnectedUsers() => await Task.FromResult(Ok(_sessionService.ConnectedUsers));

    [HttpDelete("connections/{username}")]
    public async Task<IActionResult> ForceDisconnectUser(string username)
    {
        User? user = _unitOfWork.UserRepository.GetByUsername(username);
        if (user is null) return NotFound();

        string connectionId = _sessionService.ConnectedUsers.FirstOrDefault(kvp => kvp.Value == user.Id).Key;
        if (string.IsNullOrEmpty(connectionId)) return Ok("User already disconnected");

        _sessionService.RemoveUserConnection(connectionId);
        return await Task.FromResult(Ok("User disconnected"));
    }
#endif
}
