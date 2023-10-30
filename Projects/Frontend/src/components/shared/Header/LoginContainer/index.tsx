import { useUser } from "providers/UserProvider";
import { LoginContainerProps } from "./LoginContainerProps";
import LoginContainer from "./LoginContainer";
import LoggedInContainer from "./LoggedInContainer";

export default function LoginContainerFactory() {
  const userStore = useUser();

  const props: LoginContainerProps = {
    ...userStore,
    className: 'login-container'
  }
  const Component = userStore.user ? LoggedInContainer : LoginContainer;

  return <Component {...props} />;
}