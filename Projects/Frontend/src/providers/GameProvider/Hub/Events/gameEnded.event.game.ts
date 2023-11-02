import CreateGameEvent from "./_CreateGameEvent";

export default CreateGameEvent('gameEnded', async ({ args: [updatedGame] }) => updatedGame);