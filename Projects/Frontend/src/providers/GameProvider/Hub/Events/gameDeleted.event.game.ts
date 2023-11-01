import CreateGameEvent from "./_CreateGameEvent";

export default CreateGameEvent('gameDeleted', async ({ setLogs }) => {
  setLogs([]);
  return null;
})