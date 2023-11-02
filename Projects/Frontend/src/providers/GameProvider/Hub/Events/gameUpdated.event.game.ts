import CreateGameEvent from "./_CreateGameEvent";

export default CreateGameEvent('gameUpdated', async ({ args: [updatedGame] }) => updatedGame);