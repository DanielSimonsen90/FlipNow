import CreateGameEvent from "./Setup/_CreateGameEvent";

export default CreateGameEvent('gameUpdated', async ({ args: [updatedGame] }) => updatedGame);