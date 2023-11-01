import CreateGameAction from "./_CreateGameAction";

export default CreateGameAction('flipCard', async ({ game, user, broadcastToHub, args: [cardIndex] }) => {
  if (game.turnPlayer?.user.id !== user.id) throw new Error('You have to wait your turn!');

  broadcastToHub(cardIndex);
});