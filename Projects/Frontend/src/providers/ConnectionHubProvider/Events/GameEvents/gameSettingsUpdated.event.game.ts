import { CreateGameEvent } from "./Setup";

export default CreateGameEvent('gameSettingsUpdated', async ({ args: [updatedGame] }) => updatedGame)