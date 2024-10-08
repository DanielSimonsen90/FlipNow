import { createContext } from "react";
import { ConnectionHubProviderContextType } from "./ConnectionHubProviderTypes";
import FlipNowHubConnection from "./FlipNowHubConnection";
import SystemEvents from "./Events/SystemEvents";
import { SystemEventReducer } from "./Events";

export const ConnectionHubProviderContext = createContext<ConnectionHubProviderContextType>({
  logs: [],
  setLogs: () => { }
});

export const RegisterSystemEvents = (
  context: ConnectionHubProviderContextType
) => FlipNowHubConnection.getInstance().reigster(
  SystemEvents, 
  (event, ...args) => {
    try {
      return SystemEventReducer(event, { args, ...context })
    } catch (error) {
      alert((error as Error).message);
    }
  }
);