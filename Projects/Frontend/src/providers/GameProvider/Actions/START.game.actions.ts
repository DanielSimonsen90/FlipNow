import { PlayState } from "models/backend";
import CreateGameAction from "./_CreateGameAction";

export default CreateGameAction('START', async (game, user) => {
  if (user.id !== game.host.id) throw new Error('Only the host can start the game');

  return {
    ...game,
    playState: PlayState.PLAYING,
  }
});