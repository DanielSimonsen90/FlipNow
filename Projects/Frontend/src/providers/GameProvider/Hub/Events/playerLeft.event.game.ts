import CreateGameEvent from "./_CreateGameEvent";

export default CreateGameEvent('playerLeft', async ({ player, args: [updatedGame] }) => {
  if (!player) throw new Error(`Client's Player not found`);
  return updatedGame.players.some(p => p.id === player.id) ? updatedGame : null;
});