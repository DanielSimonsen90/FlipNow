using FlipNow.Business.Services;
using FlipNow.Common.Entities;
using Microsoft.AspNetCore.Mvc;

namespace FlipNow.API.Controllers;

public class UsersController : BaseController
{
    public UsersController(UnitOfWork unitOfWork) : base(unitOfWork) { }

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
}
