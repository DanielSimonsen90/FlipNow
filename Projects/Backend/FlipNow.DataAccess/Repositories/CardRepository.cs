using DanhoLibrary.NLayer;
using FlipNow.Common.Entities;
using DanhoLibrary.Extensions;

namespace FlipNow.DataAccess.Repositories;

public class CardRepository : BaseRepository<Card, Guid>
{
    public CardRepository(FlipNowDbContext context) : base(context) {}

    public IEnumerable<Card> GetAllRandom(int limit) => limit == int.MaxValue ? GetAll() : GetAll().OrderBy(_ => Guid.NewGuid()).Take(limit);
    public IEnumerable<Card> GetAllTwiceShuffled(int limit = int.MaxValue)
    {
        var results = GetAllRandom(limit).ToList();
        results.AddRange(results);
        return results.OrderBy(_ => Guid.NewGuid());
    }
}
