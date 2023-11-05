using FlipNow.Business.Services;
using FlipNow.Common.Entities;
using Microsoft.AspNetCore.Mvc;

namespace FlipNow.API.Controllers;

public class CardController : BaseController
{
    public CardController(UnitOfWork unitOfWork) : base(unitOfWork) {}

#if DEBUG
    [HttpPost]
    public async Task<IActionResult> CreateCard(string cardName)
    {
        bool existss = _unitOfWork.CardRepository.Get(c => c.Name == cardName) is not null;
        if (existss) return BadRequest("Card already exists");
        
        Card card = _unitOfWork.CardRepository.Add(new()
        {
            Name = cardName
        });
        await _unitOfWork.SaveChangesAsync();
        
        return Created("", card.Name);
    }
#endif
}
