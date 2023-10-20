using DanhoLibrary.NLayer;
using FlipNow.Common.Entities;
using Microsoft.EntityFrameworkCore;

namespace FlipNow.DataAccess.Repositories;

public class GameRepository : BaseRepository<Game, Guid>
{
    public GameRepository(DbContext context) : base(context) { }

    public Game? GetGameFromUser(User user) => Get(game => game.PlayingUsers.Any(playingUser => playingUser.Id == user.Id)); // TODO: Needs testing
    public Game? GetGameByInviteCode(string code) => Get(Guid.Parse(code));
}
