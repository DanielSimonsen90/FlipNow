using DanhoLibrary.NLayer;
using System.ComponentModel.DataAnnotations.Schema;
#nullable disable

namespace FlipNow.Common.Entities;

public class UserScore : BaseEntity<Guid>
{
    public User User { get; set; }
    public Game Game { get; set; }
    public double Score { get; set; }
    public TimeSpan Time { get; set; }
}
