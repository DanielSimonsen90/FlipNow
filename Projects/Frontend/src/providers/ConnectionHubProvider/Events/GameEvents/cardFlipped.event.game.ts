import CreateGameEvent from "./Setup/_CreateGameEvent";

export default CreateGameEvent('cardFlipped', async ({ args: [updatedGame] }) => updatedGame)