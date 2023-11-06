import { useGame } from "providers/GameProvider";
import ConnectionLogger from "components/shared/ConnectionLogger";

import { CardContainer, InviteCode, Leaderboard, TurnTeller, GameControlPanel } from "./components";
import { DeleteGameButton, EndGameButton, GiveUpButton } from "../Buttons";
import { PlayState } from "models/backend";

export default function ActiveGame() {
  const { game } = useGame(false);
  const started = game.playState === PlayState.PLAYING;
  const ended = game.playState === PlayState.ENDED;

  return (
    <div id="active-game">
      <h1>{game.lobbyName}</h1>
      <InviteCode />

      <div className="game-container" style={{ '--cards-amount': game.cards.length } as any}>
        <TurnTeller />
        {started ? <CardContainer /> : <GameControlPanel />}
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