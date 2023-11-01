import { Button } from "danholibraryrjs";
import { useGame } from "providers/GameProvider";

export default function CreateGameButton() {
  const { dispatch } = useGame();

  return (
    <Button id="create-game" importance="primary" onClick={() => dispatch('createGame')}>Start playing</Button>
  );
}