import { Button } from "danholibraryrjs";
import { useGame } from "providers/GameProvider";

export default function EndGameButton() {
  const { dispatch } = useGame(false);
  return <Button importance="secondary" onClick={() => dispatch('endGame')}>End Game</Button>;
}