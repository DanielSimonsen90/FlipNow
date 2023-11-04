import CreateUserEvent from "./Setup/_CreateUserEvent";

export default CreateUserEvent('userLoggedOut', async ({ setUser }) => {
  setUser(null);
})