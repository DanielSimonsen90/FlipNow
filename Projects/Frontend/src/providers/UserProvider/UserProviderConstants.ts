import { createContext } from "react";
import type { UserProviderContextType } from "./UserProviderTypes";
import { UserEventProps, HubUserEventNames, UserEventReducer } from "providers/ConnectionHubProvider/Events";
import UserEvents from "providers/ConnectionHubProvider/Events/UserEvents";
import FlipNowHubConnection from "providers/ConnectionHubProvider/FlipNowHubConnection";

export const STORAGE_KEY = "User";
export const STORAGE = window.localStorage;

export const UserProviderContext = createContext<UserProviderContextType>({
  user: null,
  loggingIn: false,
  setLoggingIn: () => {},
  dispatch: async () => {}
});

export const RegisterUserEvents = (
  props: Omit<UserEventProps<HubUserEventNames>, 'args'>
) => FlipNowHubConnection.getInstance().reigster(
  UserEvents, 
  async (event, ...args) => {
    try {
      return await UserEventReducer(event, { ...props, args })
    } catch (error) {
      alert((error as Error).message);
    }
  }
);