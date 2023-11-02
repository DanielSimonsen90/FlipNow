import { classNames } from "danholibraryrjs";
import { Player } from "models/backend";
import { useGame } from "providers/GameProvider";

export default function Leaderboard() {
  const { game, isHost, dispatch } = useGame(false);

  const isPlayerTurn = (p: Player) => game.turnPlayer && game.turnPlayer.id === p.id;

  return (
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
  );
}