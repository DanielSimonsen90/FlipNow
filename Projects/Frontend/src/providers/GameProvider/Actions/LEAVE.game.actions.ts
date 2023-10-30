import CreateGameAction from "./_CreateGameAction";

export default CreateGameAction('LEAVE', async (game, user, player) => {
  if (user.id === player.user.id) return null; // User is leaving, set state to null and let other players know
  
  // A player has left, remove them from the game
  const players = game.players.filter(p => p.id !== user.id);
  return {
    ...game,
    players,
  }
});