import { Button } from "danholibraryrjs";
import { useGame } from "providers/GameProvider";

export default function StartGameButton() {
  const { game, isHost, dispatch } = useGame(false);

  return isHost 
    ? <Button className="start-game--button" onClick={() => dispatch('startGame')}>Let the game begin</Button> 
    : <p className="start-game--text">Waiting for <span title={`${game.host.user.username} is the host`}>host</span> to start the game...</p>
}