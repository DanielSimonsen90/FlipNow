using DanhoLibrary.NLayer;
using FlipNow.Common.Entities;

namespace FlipNow.DataAccess.Repositories;

public class CardRepository : BaseRepository<Card, Guid>
{
    public CardRepository(FlipNowDbContext context) : base(context) {}

    public IEnumerable<Card> GetAllShuffled(int limit) => GetAll()
        .Take(limit)
        .OrderBy(_ => Guid.NewGuid());
    public IEnumerable<Card> GetAllShuffled() => GetAll()
        .OrderBy(_ => Guid.NewGuid());
}
