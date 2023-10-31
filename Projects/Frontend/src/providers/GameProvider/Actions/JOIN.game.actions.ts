import CreateGameAction from "./_CreateGameAction";

export default CreateGameAction('JOIN', async ({ game, broadcastToHub, args: [user, inviteCode] }) => {
  broadcastToHub()
  return game;
});