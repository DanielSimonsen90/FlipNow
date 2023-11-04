import CreateSystemEvent from "./Setup/_CreateSystemEvent";

export default CreateSystemEvent('log', async ({ args: [timestamp, message, inviteCode], setLogs }) => {
  setLogs((logs) => [...logs, { message, timestamp: new Date(timestamp) }]);
});