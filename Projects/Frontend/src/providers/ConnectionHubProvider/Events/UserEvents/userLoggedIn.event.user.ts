import CreateUserEvent from "./Setup/_CreateUserEvent";

export default CreateUserEvent('userLoggedIn', async ({ args: [succeeded, message, user], setUser, user: existingUser }) => {
  if (!succeeded  || !user) {
    alert(message);

    // Force logout if login failed
    if (existingUser) setUser(null);
    return;
  }

  setUser(user);
})