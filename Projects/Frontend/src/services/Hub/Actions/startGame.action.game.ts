import CreateGameAction from "./_CreateGameAction";

export default CreateGameAction('startGame', async ({ game, player, broadcastToHub }) => {
  if (game.host.id !== player.id) throw new Error('You must be the host to start the game');

  broadcastToHub();
})