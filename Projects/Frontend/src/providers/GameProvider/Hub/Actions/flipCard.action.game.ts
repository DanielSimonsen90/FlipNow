import CreateGameAction from "./_CreateGameAction";

export default CreateGameAction('flipCard', async ({ game, player, broadcastToHub, args: [cardIndex] }) => {
  if (game.turnPlayer?.id !== player.id) throw new Error('You have to wait your turn!');

  broadcastToHub(cardIndex);
});