using FlipNow.Business.Services;
using Microsoft.AspNetCore.Mvc;

namespace FlipNow.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public abstract class BaseController : ControllerBase
{
    protected readonly UnitOfWork _unitOfWork;
    protected const string API_URL = "https://localhost:5001/api/";

    public BaseController(UnitOfWork unitOfWork)
    {
        this._unitOfWork = unitOfWork;
    }

    protected IActionResult BadQueryRequest(string queryName) => BadRequest($"{queryName} query required.");
    protected IActionResult InternalServerError() => StatusCode(StatusCodes.Status500InternalServerError);
    protected IActionResult? TryGetObject<T>(Func<T> getObject, Func<string, IActionResult> onException, out T? result)
    {
        try
        {
            result = getObject();
            return null;
        }
        catch (Exception ex)
        {
            result = default;
            return onException(ex.Message);
        }
    }
}
