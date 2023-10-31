import CreateGameAction from "./_CreateGameAction";

export default CreateGameAction('PING', async ({ game, broadcastToHub }) => {
  broadcastToHub().then(() => console.log('broadcasted to hub'));
  return game;
})