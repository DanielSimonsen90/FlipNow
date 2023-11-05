import { useContext, useEffect } from "react";
import { ConnectionHubProviderContext, RegisterSystemEvents } from "./ConnectionHubProviderConstants";
import { ConnectionHubProviderContextType } from "./ConnectionHubProviderTypes";

export const useConnectionHubContext = () => useContext(ConnectionHubProviderContext);

export function useLogs() {
  const { logs, setLogs } = useContext(ConnectionHubProviderContext);
  return { logs, setLogs } as const;
}

export const useSystemEvents = (
  context: ConnectionHubProviderContextType
) => useEffect(() => {
  RegisterSystemEvents(context);
}, [context])