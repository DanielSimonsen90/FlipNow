import CreateGameAction from "./_CreateGameAction";

export default CreateGameAction('startGame', async ({ game, user, broadcastToHub }) => {
  if (!game) throw new Error('You must have a game active to start it');
  if (game.host.id !== user.id) throw new Error('You must be the host to start the game');

  broadcastToHub();
})