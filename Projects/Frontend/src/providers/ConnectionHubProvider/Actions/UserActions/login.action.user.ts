import { Request } from "utils";
import { CreateUserAction } from "./Setup";
import { ProvidedUserType } from "providers/UserProvider/UserProviderTypes";

export default CreateUserAction('login', async ({ args: [username], broadcastToHub }) => {
  const response = await Request<ProvidedUserType, string>(`users/${username}`);
  if (response.success) await broadcastToHub(username);

  console.error(response.text);
});