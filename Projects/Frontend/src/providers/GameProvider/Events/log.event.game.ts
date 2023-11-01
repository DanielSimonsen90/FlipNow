import CreateGameEvent from "./_CreateGameEvent";

export default CreateGameEvent('log', async ({ 
  context: { game, logs, setLogs }, 
  args: [timestamp, message] 
}) => {
  setLogs([...logs, { 
    timestamp: new Date(timestamp), 
    message 
  }]);
  return game;
});