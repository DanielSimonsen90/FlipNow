import CreateGameAction from "./_CreateGameAction";

export default CreateGameAction('joinGame', async ({ game, user, broadcastToHub, args: [inviteCode, userId] }) => {
  if (game) {
    if (game.players.some(p => p.user.id === user.id)) throw new Error('You are already in this game');
    if (game.inviteCode !== inviteCode) throw new Error('You are already in a different game');
  }

  broadcastToHub(userId);
})