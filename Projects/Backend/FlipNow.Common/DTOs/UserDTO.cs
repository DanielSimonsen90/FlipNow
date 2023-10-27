#nullable disable
namespace FlipNow.Common.DTOs;

public class UserDTO
{
    public Guid Id { get; set; }
    public string Username { get; set; }
    public double AvgScore { get; set; }
}
