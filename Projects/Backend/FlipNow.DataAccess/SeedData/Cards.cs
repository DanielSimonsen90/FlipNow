using FlipNow.Common.Entities;

namespace FlipNow.DataAccess.SeedData;

internal static class Cards
{
    public static Card[] SeedData = new[]
    {
        new Card() { Name = "Card0", Id = Guid.Parse("00000000-0000-0000-0000-000000000001") },
        new Card() { Name = "Card1", Id = Guid.Parse("00000000-0000-0000-0000-000000000002") },
        new Card() { Name = "Card2", Id = Guid.Parse("00000000-0000-0000-0000-000000000003") },
        new Card() { Name = "Card3", Id = Guid.Parse("00000000-0000-0000-0000-000000000004") },
        new Card() { Name = "Card4", Id = Guid.Parse("00000000-0000-0000-0000-000000000005") },
    };
}
