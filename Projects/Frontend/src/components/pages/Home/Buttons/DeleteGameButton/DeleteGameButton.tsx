import { Button } from "danholibraryrjs";
import { useGame } from "providers/GameProvider";

export default function DeleteGameButton() {
  const { isHost, dispatch } = useGame(false);

  const onClick = () => {
    if (window.confirm(`Are you sure you want to delete your game?`)) {
      dispatch('deleteGame');
    }
  };

  return isHost ? <Button importance="secondary" onClick={onClick}>Delete game</Button> : null;
}