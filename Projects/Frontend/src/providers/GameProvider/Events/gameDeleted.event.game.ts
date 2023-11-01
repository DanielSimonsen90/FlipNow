import CreateGameEvent from "./_CreateGameEvent";

export default CreateGameEvent('gameDeleted', async () => {
  console.log('Deleting game');
  return null;
})