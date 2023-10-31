import CreateGameAction from "./_CreateGameAction";

export default CreateGameAction('FLIP', async ({ game, user, broadcastToHub, args: [cardIndex] }) => {
  const updatedCard = game.cards[cardIndex];
  if (updatedCard.flipped) return game; // Card already flipped, ignore action

  const cards = [...game.cards];
  cards[cardIndex] = {
    ...updatedCard,
    flipped: true,
  };

  if (game.turnPlayer.user.id === user.id) {
    broadcastToHub(cardIndex);
  }

  return {
    ...game,
    cards
  };
});