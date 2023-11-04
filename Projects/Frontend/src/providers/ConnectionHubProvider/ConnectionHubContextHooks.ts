import { useContext } from "react";
import { ConnectionHubProviderContext } from "./ConnectionHubProviderConstants";

export const useConnectionHubContext = () => useContext(ConnectionHubProviderContext);
export const useConnectionHub = () => useContext(ConnectionHubProviderContext).connection;

export function useLogs() {
  const { logs, setLogs } = useContext(ConnectionHubProviderContext);
  return { logs, setLogs } as const;
}