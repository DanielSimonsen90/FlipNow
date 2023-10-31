import CreateGameAction from "./_CreateGameAction";

export default CreateGameAction('DELETE', async ({ game, user, broadcastToHub }) => {
  if (!user) throw new Error('User not logged in');
  if (!game) throw new Error('Game does not exist');

  if (user.id === game.host.id) {
    broadcastToHub(game.inviteCode);
  }

  return null;
});