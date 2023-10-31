import { Button } from "danholibraryrjs";
import { useGame } from "providers/GameProvider";

export default function DefaultHome() {
  const { dispatch } = useGame();

  return (
    <main>
      <Button onClick={() => dispatch('createGame')}>Start playing</Button>
    </main>
  );
}