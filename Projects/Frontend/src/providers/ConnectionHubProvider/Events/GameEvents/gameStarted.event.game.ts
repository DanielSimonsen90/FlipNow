import CreateGameEvent from "./Setup/_CreateGameEvent";

export default CreateGameEvent('gameStarted', async ({ args: [updatedGame] }) => updatedGame);