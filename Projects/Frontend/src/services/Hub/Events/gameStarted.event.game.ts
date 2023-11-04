import CreateGameEvent from "./_CreateGameEvent";

export default CreateGameEvent('gameStarted', async ({ args: [updatedGame] }) => updatedGame);