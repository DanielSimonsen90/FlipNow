import { Dispatch, SetStateAction } from "react";

export type ConnectionHubProviderContextType = {
  logs: Log[];
  setLogs: Dispatch<SetStateAction<Log[]>>;
}

export type Log = {
  timestamp: Date;
  message: string;
};