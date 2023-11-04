import { Button } from "danholibraryrjs";
import { useGame } from "providers/GameProvider";
import { useUser } from "providers/UserProvider";
import { useState } from "react";

export default function CreateGameButton() {
  const { dispatch: userDispatch } = useUser();
  const { dispatch: gameDispatch } = useGame();
  const [pressed, setPressed] = useState(false);

  function onClick() {
    setPressed(true);
    gameDispatch('createGame').catch(err => {
      if (err instanceof Error && err.message === 'User not logged in') {
        const username = prompt('Insert your username');
        if (username) userDispatch('login', username).then(() => gameDispatch('createGame'));
      }
      
      setPressed(false);
    })
  }

  return (
    <Button id="create-game" importance="primary" 
      disabled={pressed}
      onClick={onClick}
    >{pressed ? 'Creating your game...' : 'Start playing'}</Button>
  );
}