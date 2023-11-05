using FlipNow.Business.Services;
using FlipNow.Common.Entities;
using Microsoft.AspNetCore.Mvc;

namespace FlipNow.API.Controllers;

public class CardsController : BaseController
{
    public CardsController(UnitOfWork unitOfWork) : base(unitOfWork) {}

#if DEBUG
    [HttpPost]
    public async Task<IActionResult> CreateCard()
    {
        int cardNumber = _unitOfWork.CardRepository.GetAll().Count();
        Card card = _unitOfWork.CardRepository.Add(new()
        {
            Name = $"Card{cardNumber}"
        });
        await _unitOfWork.SaveChangesAsync();
        
        return Created("", card.Name);
    }

#endif

    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(_unitOfWork.CardRepository.GetAll().Select(c => c.Name));
    }
}
