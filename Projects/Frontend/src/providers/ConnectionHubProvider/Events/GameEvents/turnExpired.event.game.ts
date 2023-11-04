import CreateGameEvent from "./Setup/_CreateGameEvent";

export default CreateGameEvent('turnExpired', async ({ player, args: [updatedGame, affectedPlayer] }) => {
  if (player && player.id === affectedPlayer.id) alert('You ran out of time, and have been skipped!');
  return updatedGame;
})