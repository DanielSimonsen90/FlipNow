import CreateGameEvent from "./_CreateGameEvent";

export default CreateGameEvent('playerLeft', async ({ user, args: [updatedGame] }) => {
  return updatedGame.players.some(p => p.user.id === user.id) ? updatedGame : null;
});