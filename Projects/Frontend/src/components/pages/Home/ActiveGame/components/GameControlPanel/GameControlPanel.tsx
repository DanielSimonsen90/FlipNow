import { Button } from "danholibraryrjs";
import { useGame } from "providers/GameProvider";

export default function GameControlPanel() {
  const { game, isHost, dispatch } = useGame(false);
  function openGameSettings() {
    throw new Error("Not implemented");
  }

  return isHost ? (
      <div className="button-container game-control-panel">
        <Button importance="tertiary" onClick={openGameSettings} title="Open game settings">⚙️</Button>
        <Button className="start-game--button" onClick={() => dispatch('startGame')}>Let the game begin</Button>
      </div>
    ) : <p className="start-game--text">Waiting for <span title={`${game.host.user.username} is the host`}>host</span> to start the game...</p>
}