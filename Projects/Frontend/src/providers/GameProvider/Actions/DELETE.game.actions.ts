import CreateGameAction from "./_CreateGameAction";

export default CreateGameAction('DELETE', async (game, user) => {
  if (!user) throw new Error('User not logged in');
  if (!game) throw new Error('Game does not exist');

  return null;
});