using DanhoLibrary.NLayer;
using FlipNow.Common.Entities;
using DanhoLibrary.Extensions;

namespace FlipNow.DataAccess.Repositories;

public class CardRepository : BaseRepository<Card, Guid>
{
    public CardRepository(FlipNowDbContext context) : base(context) {}

    public IEnumerable<Card> GetAll(int limit) => limit == int.MaxValue ? GetAll() : GetAll().Take(limit);
    public IEnumerable<Card> GetAllTwiceShuffled(int limit = int.MaxValue) => (
        GetAll(limit)
        .ToList() as IList<Card>)
        .AddRange(GetAll(limit))
        .OrderBy(_ => Guid.NewGuid());
}
