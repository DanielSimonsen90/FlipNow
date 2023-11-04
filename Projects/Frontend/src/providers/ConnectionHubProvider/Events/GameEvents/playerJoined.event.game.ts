import CreateGameEvent from "./Setup/_CreateGameEvent";

export default CreateGameEvent('playerJoined', async ({ args: [updatedGame] }) => {
  return updatedGame;
});