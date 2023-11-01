import { useGame } from "providers/GameProvider";
import ConnectionLogger from "components/shared/ConnectionLogger";

import { Game, InviteCode, PlayerList } from "./components";
import { DeleteGameButton, GiveUpButton } from "../Buttons";

export default function ActiveGame() {
  const { game } = useGame(false);

  return (
    <div id="active-game">
      <h1>{game.host.user.username}'s Game</h1>

      <InviteCode />
      <Game />
      <PlayerList />

      <div className="button-container">
        <DeleteGameButton />
        <GiveUpButton />
      </div>

      <ConnectionLogger />
    </div>
  );
}