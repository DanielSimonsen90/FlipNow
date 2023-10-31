import { PlayState } from "models/backend";
import CreateGameAction from "./_CreateGameAction";

export default CreateGameAction('STOP', async ({ game, user, broadcastToHub }) => {
  if (user.id !== game.host.id) throw new Error('Only the host can start the game');

  // broadcastToHub();

  return {
    ...game,
    playState: PlayState.ENDED,
  };
});