import CreateGameAction from "./_CreateGameAction";

export default CreateGameAction('leaveGame', async ({ game, user, broadcastToHub, args: [playerId] }) => {
  if (!game.players.some(p => p.user.id === user.id)) throw new Error('You are not in this game... how did you get here?');

  broadcastToHub(playerId);
})