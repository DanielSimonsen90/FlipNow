import { Button } from "danholibraryrjs";
import { PlayState } from "models/backend";
import { useGame } from "providers/GameProvider";

export default function EndGameButton() {
  const { game, dispatch } = useGame(false);
  return <Button importance="secondary" 
    disabled={game.playState !== PlayState.PLAYING}
    onClick={() => dispatch('endGame')}>End Game</Button>;
}