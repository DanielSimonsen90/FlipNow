import { Request } from "utils";
import { CreateUserAction } from "./Setup";
import { ProvidedUserType } from "providers/UserProvider/UserProviderTypes";

export default CreateUserAction('login', async ({ 
  args: [username], 
  broadcastToHub, 
  connection: { connectionId } 
}) => {
  const response = await Request<ProvidedUserType, string>(`users/${username}`);
  if (response.success) return await broadcastToHub(username, connectionId);

  console.error(response.text);
});