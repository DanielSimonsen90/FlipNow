import CreateGameAction from "./_CreateGameAction";

export default CreateGameAction('endGame', async ({ game, player, broadcastToHub }) => {
  if (game.host.id !== player.id) throw new Error('Only the host can end the game');

  broadcastToHub();
});