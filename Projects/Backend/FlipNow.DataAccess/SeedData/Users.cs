using FlipNow.Common.Entities;

namespace FlipNow.DataAccess.SeedData;

public static class Users
{
    public static readonly User[] SeedData = new[]
    {
        new User()
        {
            Id = Guid.Parse("00000000-0000-0000-0000-000000000006"),
            Username = "Dumbho",
            AvgScore = 0,
        }
    };
}
