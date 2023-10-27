#nullable disable

namespace FlipNow.Common.DTOs;

public class UserScoreDTO
{
    public Guid Id { get; set; }
    public double Score { get; set; }
    public TimeSpan Time { get; set; }
}
