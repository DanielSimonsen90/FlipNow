import { Request } from "utils";
import CreateGameAction from "./_CreateGameAction";
import { ActiveGame } from "models/backend";

export default CreateGameAction('CREATE', async (game, user) => {
  if (!user) throw new Error('User not logged in');
  if (game) throw new Error('Game already exists');
  
  const created = await Request<ActiveGame, string>(`games?hostId=${user.id}`, {
    method: 'POST'
  });

  if (!created.success) throw new Error(`Failed to create game: ${created.text}`);
  return created.data;
});