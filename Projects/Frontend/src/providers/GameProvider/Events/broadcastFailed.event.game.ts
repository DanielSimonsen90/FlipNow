import CreateGameEvent from "./_CreateGameEvent";

export default CreateGameEvent('broadcastFailed', async ({ context: { game }, args: [message] }) => {
  alert(`Broadcast failed: ${message}`)
  return game;
});