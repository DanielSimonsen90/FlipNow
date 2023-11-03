import { classNames } from "danholibraryrjs";
import { PlayState, Player } from "models/backend";
import { useGame } from "providers/GameProvider";

export default function Leaderboard() {
  const { game, isHost, dispatch } = useGame(false);

  const isPlayerTurn = (p: Player) => game.turn.player && game.turn.player.id === p.id;

  return (
    <aside className="leaderboard-container">
      <h3>{game.playState === PlayState.PLAYING ? 'Leaderboard' : 'Players'}</h3>
      <p className="player-count">{game.players.length}/{game.maxPlayersAllowed} players</p>

      <ul id="leaderboard">
        {game.leaderboard.map(p => (
          <li key={p.id}
            className={classNames(
              isPlayerTurn(p) ? 'turn' : undefined,
              game.host.id === p.id ? 'host' : undefined,
            )}
            onClick={() =>
              isHost
              && window.confirm(`Are you sure you want to kick ${p.user.username}?`)
              && dispatch('leaveGame', p.id)
            }
          >
            <span
              className="playername"
              title={isPlayerTurn(p) ? `It is ${p.user.username}'s turn.` : ''}
            >{p.user.username}</span>
            <span className="score">Score: {p.score}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}