using DanhoLibrary.NLayer;
using FlipNow.Common.Entities;
using Microsoft.EntityFrameworkCore;

namespace FlipNow.DataAccess.Repositories;

public class UserRepository : BaseRepository<User, Guid>
{
    public UserRepository(DbContext context) : base(context) { }
}
