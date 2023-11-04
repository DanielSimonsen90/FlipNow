import { createContext } from "react";
import { ConnectionHubProviderContextType } from "./ConnectionHubProviderTypes";
import FlipNowHubConnection from "./FlipNowHubConnection";

export const ConnectionHubProviderContext = createContext<ConnectionHubProviderContextType>({
  connection: FlipNowHubConnection,
  logs: [],
  setLogs: () => { }
});