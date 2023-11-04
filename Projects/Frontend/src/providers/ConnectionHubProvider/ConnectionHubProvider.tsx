import { PropsWithChildren, useState } from "react";
import { ConnectionHubProviderContext } from "./ConnectionHubProviderConstants";
import { Log } from "./ConnectionHubProviderTypes";
import connection from './FlipNowHubConnection';

export default function ConnectionHubProvider({ children }: PropsWithChildren) {
  const [logs, setLogs] = useState<Array<Log>>([]);
  
  return (
    <ConnectionHubProviderContext.Provider value={{ connection, logs, setLogs }}>
      {children}
    </ConnectionHubProviderContext.Provider>
  );
}