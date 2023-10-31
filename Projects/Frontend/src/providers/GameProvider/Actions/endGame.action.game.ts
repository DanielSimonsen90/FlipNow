import CreateGameAction from "./_CreateGameAction";

export default CreateGameAction('endGame', async ({ game, user, broadcastToHub }) => {
  if (game.host.id !== user.id) throw new Error('Only the host can end the game');

  broadcastToHub();
});