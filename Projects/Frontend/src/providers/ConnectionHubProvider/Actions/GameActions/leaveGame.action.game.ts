import CreateGameAction from "./Setup/_CreateGameAction";

export default CreateGameAction('leaveGame', async ({ game, player, broadcastToHub, args: [playerId] }) => {
  if (!game.players.some(p => p.id === player.id)) throw new Error('You are not in this game... how did you get here?');

  broadcastToHub(playerId);
})