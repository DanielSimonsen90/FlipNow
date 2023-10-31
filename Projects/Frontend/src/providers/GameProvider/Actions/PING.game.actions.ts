import CreateGameAction from "./_CreateGameAction";

export default CreateGameAction('PING', async ({ game, broadcastToHub }) => {
  broadcastToHub();
  return game;
})