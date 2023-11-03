#nullable disable

using FlipNow.Common.Entities;

namespace FlipNow.Common.DTOs.Get;

public class GetGameDTO
{
    public Guid Id { get; set; }
    
    public ICollection<UserScoreDTO> Scores { get; set; }
    public ICollection<UserDTO> PlayingUsers { get; set; }
    public ICollection<CardDTO> Cards { get; set; }
    public DateTime SavedTimestamp { get; set; }

}
