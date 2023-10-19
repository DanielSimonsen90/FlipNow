using FlipNow.Common.Entities;

namespace FlipNow.DataAccess.SeedData;

public static class Users
{
    public static User[] SeedData = new[]
    {
        new User()
        {
            Username = "Dumbho",
            AvgScore = 0,
            HighestScore = new UserScore()
        }
    };
}
