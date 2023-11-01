import CreateGameEvent from "./_CreateGameEvent";

export default CreateGameEvent('playerJoined', async ({ args: [updatedGame] }) => {
  return updatedGame;
});