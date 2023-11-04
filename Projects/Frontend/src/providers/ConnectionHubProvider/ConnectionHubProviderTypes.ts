import { Dispatch, SetStateAction } from "react";
import { FlipNowHubConnection } from "./FlipNowHubConnection";

export type ConnectionHubProviderContextType = {
  connection: FlipNowHubConnection;
  
  logs: Log[];
  setLogs: Dispatch<SetStateAction<Log[]>>;
}

export type Log = {
  timestamp: Date;
  message: string;
};