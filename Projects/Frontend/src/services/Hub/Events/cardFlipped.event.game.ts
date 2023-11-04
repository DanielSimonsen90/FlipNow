import CreateGameEvent from "./_CreateGameEvent";

export default CreateGameEvent('cardFlipped', async ({ args: [updatedGame] }) => updatedGame)