import CreateGameAction from "./_CreateGameAction";

export default CreateGameAction('startGame', async ({ game, user, broadcastToHub }) => {
  if (game.host.id !== user.id) throw new Error('You must be the host to start the game');

  broadcastToHub();
})