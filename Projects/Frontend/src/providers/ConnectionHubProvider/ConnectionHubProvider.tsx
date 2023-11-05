import { PropsWithChildren, useState } from "react";

import { ConnectionHubProviderContext, RegisterSystemEvents } from "./ConnectionHubProviderConstants";
import { Log } from "./ConnectionHubProviderTypes";
import { useSystemEvents } from "./ConnectionHubProviderHooks";

export default function ConnectionHubProvider({ children }: PropsWithChildren) {
  const [logs, setLogs] = useState<Array<Log>>([]);

  useSystemEvents({ logs, setLogs });

  return (
    <ConnectionHubProviderContext.Provider value={{ logs, setLogs }}>
      {children}
    </ConnectionHubProviderContext.Provider>
  );
}