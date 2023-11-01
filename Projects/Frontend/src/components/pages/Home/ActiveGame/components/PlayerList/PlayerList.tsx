import { useGame } from "providers/GameProvider";

export default function PlayerList() {
  const { game } = useGame(false);

  return (
    <ul>
      {game.players.map(p => (
        <li key={p.id}>{p.user.username}</li>
      ))}
    </ul>
  );
}