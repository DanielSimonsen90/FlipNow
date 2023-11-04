import CreateSystemEvent from "./Setup/_CreateSystemEvent";

export default CreateSystemEvent('broadcastFailed', async ({ args: [message, inviteCode] }) => {
  alert(`Broadcast failed: ${message}`);
});