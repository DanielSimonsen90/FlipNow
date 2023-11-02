import { Button } from "danholibraryrjs";
import { useGame } from "providers/GameProvider";
import { useState } from "react";

export default function CreateGameButton() {
  const { dispatch } = useGame();
  const [pressed, setPressed] = useState(false);

  function onClick() {
    setPressed(true);
    dispatch('createGame');
  }

  return (
    <Button id="create-game" importance="primary" 
      disabled={pressed}
      onClick={onClick}
    >{pressed ? 'Creating your game...' : 'Start playing'}</Button>
  );
}