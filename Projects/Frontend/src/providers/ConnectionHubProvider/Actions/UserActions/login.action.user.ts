import { CreateUserAction } from "./Setup";

export default CreateUserAction('login', async ({ args: [username], broadcastToHub }) => {
  await broadcastToHub('login', username);
});