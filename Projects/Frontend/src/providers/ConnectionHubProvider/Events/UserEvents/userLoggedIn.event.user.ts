import CreateUserEvent from "./Setup/_CreateUserEvent";

export default CreateUserEvent('userLoggedIn', async ({ args: [succeeded, message, user], setUser, user: existingUser }) => {
  if (!succeeded || message || !user) {
    alert(message);
    if (existingUser) setUser(null);
    return;
  }

  setUser(user);
})