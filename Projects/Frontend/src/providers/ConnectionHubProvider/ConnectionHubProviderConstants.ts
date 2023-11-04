import { createContext } from "react";
import { ConnectionHubProviderContextType } from "./ConnectionHubProviderTypes";
import FlipNowHubConnection from "./FlipNowHubConnection";

export const ConnectionHubProviderContext = createContext<ConnectionHubProviderContextType>({
  connection: {} as FlipNowHubConnection,
  logs: [],
  setLogs: () => { }
});