using FlipNow.Entities.Entities;

namespace FlipNow.DataAccess.SeedData;

internal static class Cards
{
    public static Card[] SeedData = new[]
    {
        new Card() { Name = "Card0" },
        new Card() { Name = "Card1" },
        new Card() { Name = "Card2" },
        new Card() { Name = "Card3" },
        new Card() { Name = "Card4" },
    };
}
