import CreateGameEvent from "./_CreateGameEvent";

export default CreateGameEvent('broadcastFailed', async ({ game, args: [message] }) => {
  alert(`Broadcast failed: ${message}`)
  return game;
});