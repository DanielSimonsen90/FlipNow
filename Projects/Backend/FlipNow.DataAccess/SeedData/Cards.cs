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
        new Card() { Name = "Card5", Id = Guid.Parse("00000000-0000-0000-0000-000000000006") },
        new Card() { Name = "Card6", Id = Guid.Parse("00000000-0000-0000-0000-000000000007") },
        new Card() { Name = "Card7", Id = Guid.Parse("00000000-0000-0000-0000-000000000008") },
        new Card() { Name = "Card8", Id = Guid.Parse("00000000-0000-0000-0000-000000000009") },
        new Card() { Name = "Card9", Id = Guid.Parse("00000000-0000-0000-0000-000000000010") },
        new Card() { Name = "Card10", Id = Guid.Parse("00000000-0000-0000-0000-000000000011") },
        new Card() { Name = "Card11", Id = Guid.Parse("00000000-0000-0000-0000-000000000012") },
        new Card() { Name = "Card12", Id = Guid.Parse("00000000-0000-0000-0000-000000000013") },
    };
}
