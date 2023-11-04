import CreateUserEvent from "./Setup/_CreateUserEvent";

export default CreateUserEvent('userLoggedIn', async ({ args: [succeeded, message, user], setUser, user: existingUser }) => {
  if (!user && !existingUser) {
    alert(message);

    // Force logout if login failed
    if (existingUser) setUser(user);
    return;
  }

  setUser(user);
});