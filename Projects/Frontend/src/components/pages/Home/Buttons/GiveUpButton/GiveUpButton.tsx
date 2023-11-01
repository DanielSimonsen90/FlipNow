import { Button } from "danholibraryrjs";
import { useGame } from "providers/GameProvider";

export default function GiveUpButton() {
  const { isHost, player, dispatch } = useGame(false);

  const onGiveUpClicked = () => {
    if (!player || isHost || !window.confirm('Are you sure you want to give up?')) return;

    dispatch('leaveGame', player.id);
  }

  return (
    <Button id="give-up" importance="secondary" 
      disabled={isHost} title={isHost 
        ? 'You started this, so you better finish it too, bestie' 
        : "You really wanna give up? Don't be a quitter, bestie"}
      onClick={onGiveUpClicked}
    >Give up</Button>
  );
}