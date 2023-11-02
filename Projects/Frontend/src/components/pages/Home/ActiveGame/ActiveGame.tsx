import { useGame } from "providers/GameProvider";
import ConnectionLogger from "components/shared/ConnectionLogger";

import { CardContainer, InviteCode, PlayerList } from "./components";
import { DeleteGameButton, EndGameButton, GiveUpButton } from "../Buttons";
import { PlayState } from "models/backend";
import StartGameButton from "../Buttons/StartGameButton";

export default function ActiveGame() {
  const { game } = useGame(false);
  const started = game.playState === PlayState.PLAYING;

  return (
    <div id="active-game">
      <h1>{game.host.user.username}'s Game</h1>
      <InviteCode />

      <div className="game-container">
        {started ? <CardContainer /> : <StartGameButton />}
        <PlayerList />
      </div>

      <div className="button-container">
        <DeleteGameButton />
        <EndGameButton />
        <GiveUpButton />
      </div>

      <ConnectionLogger />
    </div>
  );
}