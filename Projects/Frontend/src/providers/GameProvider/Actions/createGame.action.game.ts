import { Request } from "utils";
import CreateGameAction from "./_CreateGameAction";
import { ActiveGame } from "models/backend";

export default CreateGameAction('createGame', async ({ game, user }) => {
  if (game) throw new Error('You already have a game active');
  if (!user) throw new Error('Please log in before creating a game');

  const gameResponse = await Request<ActiveGame, string>(`games?hostId=${user.id}`, {
    method: 'POST'
  });

  if (!gameResponse.success) throw new Error(gameResponse.text);
  return gameResponse.data;
})