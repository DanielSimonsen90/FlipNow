import CreateGameAction from "./Setup/_CreateGameAction";

export default CreateGameAction('deleteGame', async ({ game, player, broadcastToHub }) => {
  if (game.host.id !== player.id) throw new Error('Only the host can delete the game');

  broadcastToHub();
});