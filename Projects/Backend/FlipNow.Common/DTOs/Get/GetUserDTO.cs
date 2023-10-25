#nullable disable
namespace FlipNow.Common.DTOs.Get;

public class GetUserDTO : UserDTO
{
    public IEnumerable<UserScoreDTO> Scores { get; set; }
}
