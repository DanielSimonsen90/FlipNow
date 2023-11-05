import CreateGameAction from "./Setup/_CreateGameAction";

export default CreateGameAction('joinGame', async ({ 
  game, player, broadcastToHub, 
  args: [inviteCode, userId] 
}) => {
  if (game) {
    if (game.players.some(p => p.id === player.id)) throw new Error('You are already in this game');
    if (game.inviteCode !== inviteCode) throw new Error('You are already in a different game');
  }

  broadcastToHub(inviteCode, userId);
})