using DanhoLibrary.NLayer;
using FlipNow.DataAccess;
using FlipNow.DataAccess.Repositories;

namespace FlipNow.Business.Services;

public class UnitOfWork : BaseUnitOfWork<FlipNowDbContext>
{
    public UnitOfWork(FlipNowDbContext context) : base(context)
    {
        CardRepository = new(context);
        GameRepository = new(context);
        UserRepository = new(context);
        UserScoreRepository = new(context);
    }

    public CardRepository CardRepository { get; set; }
    public GameRepository GameRepository { get; set; }
    public UserRepository UserRepository { get; set; }
    public UserScoreRepository UserScoreRepository { get; set; }
}
