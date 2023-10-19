using FlipNow.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
