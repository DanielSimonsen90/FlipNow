import { Button } from "danholibraryrjs";
import { PlayState } from "models/backend";
import { useGame } from "providers/GameProvider";

export default function GiveUpButton() {
  const { game, isHost, player, dispatch } = useGame(false);

  const onGiveUpClicked = () => {
    if (!player || !window.confirm('Are you sure you want to give up?')) return;

    dispatch('leaveGame', player.id);
  }

  return (
    <Button id="give-up" importance="secondary" 
      disabled={game.playState !== PlayState.PLAYING} title={isHost 
        ? 'You started this, so you can finish it too, bestie' 
        : "You really wanna give up? Don't be a quitter, bestie"}
      onClick={onGiveUpClicked}
    >Give up</Button>
  );
}