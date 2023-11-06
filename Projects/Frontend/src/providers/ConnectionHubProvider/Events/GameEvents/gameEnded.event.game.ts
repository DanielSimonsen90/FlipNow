import CreateGameEvent from "./Setup/_CreateGameEvent";

export default CreateGameEvent('gameEnded', async ({ args: [updatedGame] }) => updatedGame);