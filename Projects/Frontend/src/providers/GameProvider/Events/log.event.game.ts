import CreateGameEvent from "./_CreateGameEvent";

export default CreateGameEvent('log', async ({ 
  context: { game, logs, setLogs }, 
  args: [message] 
}) => {
  setLogs([...logs, message]);
  return game;
});