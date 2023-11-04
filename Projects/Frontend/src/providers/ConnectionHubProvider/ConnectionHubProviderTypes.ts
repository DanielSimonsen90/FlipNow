import { Dispatch, SetStateAction } from "react";
import { FlipNowHubConnectionType } from "./FlipNowHubConnection";

export type ConnectionHubProviderContextType = {
  connection: FlipNowHubConnectionType;
  
  logs: Log[];
  setLogs: Dispatch<SetStateAction<Log[]>>;
}

export type Log = {
  timestamp: Date;
  message: string;
};