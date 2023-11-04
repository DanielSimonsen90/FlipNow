import { PropsWithChildren, useState } from "react";
import { ConnectionHubProviderContext } from "./ConnectionHubProviderConstants";
import { Log } from "./ConnectionHubProviderTypes";
import FlipNowHubConnection from "./FlipNowHubConnection";
import { useSystemEvents } from "./ConnectionHubProviderHooks";

const connection = FlipNowHubConnection.getInstance();

export default function ConnectionHubProvider({ children }: PropsWithChildren) {
  const [logs, setLogs] = useState<Array<Log>>([]);

  useSystemEvents({ connection, logs, setLogs  });
  
  return (
    <ConnectionHubProviderContext.Provider value={{ connection, logs, setLogs }}>
      {children}
    </ConnectionHubProviderContext.Provider>
  );
}