using FlipNow.Common.Entities;
using FlipNow.DataAccess.Repositories;
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

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        DefineEntityRelationships(builder);
        InsertSeedData(builder);
    }
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);

        if (optionsBuilder.IsConfigured) return;

        optionsBuilder.UseSqlServer(new List<string>()
        {
            "Server=(localdb)\\MSSqlLocalDb",
            "Database=FlipNow",
            "Trusted_Connection=True",
            "MultipleActiveResultSets=true"
        }.Aggregate((a, b) => $"{a};{b}"));
    }

    private static void DefineEntityRelationships(ModelBuilder builder)
    {
        builder.Entity<Card>()
            .HasMany(c => c.Games)
            .WithMany(g => g.Cards)
            .UsingEntity<CardGame>();

        builder.Entity<Game>()
            .HasMany(g => g.PlayingUsers)
            .WithOne(u => u.ActiveGame);
        builder.Entity<Game>()
            .HasMany(g => g.Scores)
            .WithOne(us => us.Game);
        //builder.Entity<Game>()
        //    .HasOne(g => g.WinnerScore)
        //    .WithOne(us => us.Game);

        //builder.Entity<User>()
        //    .HasOne(u => u.HighestScore)
        //    .WithOne(us => us.User);

        builder.Entity<UserScore>()
            .HasOne(us => us.User)
            .WithMany(u => u.Scores);
    }

    private static void InsertSeedData(ModelBuilder builder)
    {
        builder.Entity<Card>().HasData(SeedData.Cards.SeedData);
        builder.Entity<User>().HasData(SeedData.Users.SeedData);
    }

}
