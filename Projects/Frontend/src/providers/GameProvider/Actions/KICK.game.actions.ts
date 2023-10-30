import CreateGameAction from "./_CreateGameAction";

export default CreateGameAction('KICK', async (game, user, player) => {
  if (user.id !== game.host.id) throw new Error('Only the host can kick players');

  const players = game.players.filter(p => p.id !== player.id);
  
  return {
    ...game,
    players,
  }
});