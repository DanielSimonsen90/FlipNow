import { Button } from "danholibraryrjs";
import { useGame } from "providers/GameProvider";
import { useUser } from "providers/UserProvider";
import { useState } from "react";

export default function CreateGameButton() {
  const { createOrFind } = useUser();
  const { dispatch } = useGame();
  const [pressed, setPressed] = useState(false);

  function onClick() {
    setPressed(true);
    dispatch('createGame').catch(err => {
      if (err instanceof Error && err.message === 'User not logged in') {
        const username = prompt('Insert your username');
        if (username) createOrFind(username).then(() => dispatch('createGame'));
        
        setPressed(false);
      }
    })
  }

  return (
    <Button id="create-game" importance="primary" 
      disabled={pressed}
      onClick={onClick}
    >{pressed ? 'Creating your game...' : 'Start playing'}</Button>
  );
}