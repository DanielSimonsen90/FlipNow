import CreateGameEvent from "./_CreateGameEvent";

export default CreateGameEvent('gameDeleted', async ({ context: { setLogs } }) => {
  console.log('Deleting game');
  setLogs([]);
  return null;
})