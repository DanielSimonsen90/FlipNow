using FlipNow.Common.Entities;
using Microsoft.EntityFrameworkCore;

namespace FlipNow.DataAccess;

public class FlipNowDbContext : DbContext
{
    public FlipNowDbContext() : base() { }
    public FlipNowDbContext(DbContextOptions<FlipNowDbContext> options) : base(options) { }

    public DbSet<Card> Cards { get; set; }
    public DbSet<Game> Games { get; set; }
    public DbSet<UserScore> UserScores { get; set; }
    public DbSet<User> Users { get; set; }
}
