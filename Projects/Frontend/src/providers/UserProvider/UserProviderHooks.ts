import { useContext, useEffect } from "react";
import { RegisterUserEvents, UserProviderContext } from "./UserProviderConstants";
import { UserProviderContextType } from "./UserProviderTypes";
import FlipNowHubConnection from "providers/ConnectionHubProvider/FlipNowHubConnection";
import { UserEventProps, HubUserEventNames } from "providers/ConnectionHubProvider/Events";

export function useUser<
  AllowNullable extends boolean
>(nullable: AllowNullable = true as AllowNullable) {
  return useContext(UserProviderContext) as UserProviderContextType<AllowNullable>;
}

export function useUserWithPrompt() {
  const { user, dispatch } = useUser();

  async function getUser() {
    if (user) return user;
    const username = prompt("What is your username?");
    if (!username) return null;

    return dispatch('login', username);
  }

  return { user, getUser };
}

export const useUserEvents = (props: Omit<UserEventProps<HubUserEventNames>, 'args'>) =>
  useEffect(() => {
    RegisterUserEvents(props);
  }, [props]);