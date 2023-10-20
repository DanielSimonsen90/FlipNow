using FlipNow.Business.Services;
using Microsoft.AspNetCore.Mvc;

namespace FlipNow.API.Controllers
{
    public class UsersController : BaseController
    {
        public UsersController(UnitOfWork unitOfWork) : base(unitOfWork) { }

        [HttpPost("{username}")]
        public IActionResult CreateOrFindUser(string username)
        {
            throw new NotImplementedException();
        }

        [HttpDelete("{userId:Guid}")]
        public IActionResult DeleteUser(Guid userId)
        {
            throw new NotImplementedException();
        }
    }
}
