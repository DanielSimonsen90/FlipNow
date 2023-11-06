import { Request } from "utils";
import { CreateUserAction } from "./Setup";
import { ProvidedUserType } from "providers/UserProvider/UserProviderTypes";

export default CreateUserAction('login', async ({ 
  args: [username], 
  setLoggingIn,
  broadcastToHub, 
}) => {
  setLoggingIn(true);
  const response = await Request<ProvidedUserType, string>(`users/${username}`);
  if (response.success) return await broadcastToHub(username);

  console.error(response.text);
  setLoggingIn(false);
});