import { useContext } from "react";
import { UserProviderContext } from "./UserProviderConstants";
import { UserProviderContextType } from "./UserProviderTypes";

import UserEvents from "providers/ConnectionHubProvider/Events/UserEvents";
import { HubUserEventNames, UserEventProps, UserEventReducer } from "providers/ConnectionHubProvider/Events";
import { useSignalREvents } from "providers/ConnectionHubProvider";

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
  useSignalREvents(UserEvents, async (event, ...args) => await UserEventReducer(event, { ...props, args }));