import { useGame } from "providers/GameProvider";
import ConnectionLogger from "components/shared/ConnectionLogger";

import { CardContainer, InviteCode, Leaderboard, TurnTeller } from "./components";
import { DeleteGameButton, EndGameButton, GiveUpButton } from "../Buttons";
import { PlayState } from "models/backend";
import StartGameButton from "../Buttons/StartGameButton";

export default function ActiveGame() {
  const { game } = useGame(false);
  const started = game.playState === PlayState.PLAYING;
  const ended = game.playState === PlayState.ENDED;

  return (
    <div id="active-game">
      <h1>{game.host.user.username}'s Game</h1>
      <InviteCode />

      <div className="game-container">
        <TurnTeller />
        {started ? <CardContainer /> : <StartGameButton />}
        <Leaderboard />
        {ended && (
          <div className="game-ended">
            <h2>Game Over!</h2>
            <p>{game.leaderboard[0].user.username} won the game!</p>
          </div>
        )}
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