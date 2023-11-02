using DanhoLibrary.NLayer;
using FlipNow.Common.Entities;
using DanhoLibrary.Extensions;

namespace FlipNow.DataAccess.Repositories;

public class CardRepository : BaseRepository<Card, Guid>
{
    public CardRepository(FlipNowDbContext context) : base(context) {}

    public IEnumerable<Card> GetAllShuffled(int limit) => GetAll()
        .Take(limit)
        .OrderBy(_ => Guid.NewGuid());
    public IEnumerable<Card> GetAllTwiceShuffled() => (
        GetAll()
        .ToList() as IList<Card>)
        .AddRange(GetAll())
        .OrderBy(_ => Guid.NewGuid());
}
