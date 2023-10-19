using DanhoLibrary.NLayer;
using FlipNow.Common.Entities;
using Microsoft.EntityFrameworkCore;

namespace FlipNow.DataAccess.Repositories;

public class UserScoreRepository : BaseRepository<UserScore, Guid>
{
    public UserScoreRepository(DbContext context) : base(context) { }
}
