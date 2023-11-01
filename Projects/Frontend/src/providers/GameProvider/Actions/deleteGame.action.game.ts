import CreateGameAction from "./_CreateGameAction";

export default CreateGameAction('deleteGame', async ({ game, user, broadcastToHub }) => {
  if (game.host.user.id !== user.id) throw new Error('Only the host can delete the game');

  broadcastToHub();
});