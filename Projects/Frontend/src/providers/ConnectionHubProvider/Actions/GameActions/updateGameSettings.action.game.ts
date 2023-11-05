import { PlayState } from "models/backend";
import { CreateGameAction } from "./Setup";

export default CreateGameAction('updateGameSettings', async ({
  game, isHost,
  args: [updatedSettings],
  broadcastToHub
}) => {
  if (!isHost || game.playState === PlayState.PLAYING) return; // Only the host can update settings while not playing

  await broadcastToHub(updatedSettings);
});