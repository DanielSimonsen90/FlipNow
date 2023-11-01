import { Button } from "danholibraryrjs";
import { useGame } from "providers/GameProvider";

export default function GiveUpButton() {
  const { player, dispatch } = useGame();
  const onGiveUpClicked = () => {
    if (!player || !confirm('Are you sure you want to give up?')) return;

    dispatch('leaveGame', player.id);
  }

  return (
    <Button id="give-up" importance="secondary" 
      onClick={onGiveUpClicked}
    >Give up</Button>
  );
}