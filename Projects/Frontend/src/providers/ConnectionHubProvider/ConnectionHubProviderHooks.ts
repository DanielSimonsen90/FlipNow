import { useContext, useEffect } from "react";
import { ConnectionHubProviderContext } from "./ConnectionHubProviderConstants";
import Events, { BaseCreateHubEvent, HubEventNames, HubEvents, SystemEventReducer } from "./Events";
import FlipNowHubConnection from "./FlipNowHubConnection";
import { ConnectionHubProviderContextType } from "./ConnectionHubProviderTypes";
import SystemEvents from "./Events/SystemEvents";

export const useConnectionHubContext = () => useContext(ConnectionHubProviderContext);
export const useConnectionHub = () => useContext(ConnectionHubProviderContext).connection;

export function useLogs() {
  const { logs, setLogs } = useContext(ConnectionHubProviderContext);
  return { logs, setLogs } as const;
}

const Callbacks: Map<string, Function> = new Map();
export function useInternalSignalREvents<
  EventNames extends HubEventNames,
  Events extends HubEvents,
>(
  connection: FlipNowHubConnection,
  events: Record<EventNames, BaseCreateHubEvent<string, any, any>>,
  callback: <EventName extends EventNames>(
    event: EventName,
    ...args: Events[EventName]
  ) => ReturnType<FlipNowHubConnection['on']>
) {
  useEffect(() => {
    Object.keysOf(Events).forEach((event) => {
      if (!(event in events)) return;

      const _callback = <EventName extends EventNames>(...args: Events[EventName]) => callback(event as EventName, ...args);
      connection.on(event, _callback);
      Callbacks.set(event, _callback);
    });

    return () => {
      Callbacks.forEach((callback, event) => connection.off(event as EventNames, callback as any));
      Callbacks.clear();
    };
  }, [connection, callback, events]);
}

export function useSignalREvents<
  EventNames extends HubEventNames,
  Events extends HubEvents, 
>(
  ...args: Parameters<typeof useInternalSignalREvents<EventNames, Events>> extends [arg1: any, ...args: infer Args] 
    ? Args 
    : []
) {
  const connection = useConnectionHub();
  useInternalSignalREvents(connection, ...args);
}

export const useSystemEvents = (context: ConnectionHubProviderContextType) => useInternalSignalREvents(
  context.connection, 
  SystemEvents, 
  (event, ...args) => SystemEventReducer(event, { args, ...context })
);