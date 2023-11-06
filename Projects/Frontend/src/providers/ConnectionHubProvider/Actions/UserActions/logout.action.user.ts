import { CreateUserAction } from "./Setup";

export default CreateUserAction('logout', async ({ broadcastToHub }) => {
  await broadcastToHub();
});