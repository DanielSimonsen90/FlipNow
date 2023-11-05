import { useContext, useEffect } from "react";
import { ConnectionHubProviderContext } from "./ConnectionHubProviderConstants";
import Events, { BaseCreateHubEvent, HubEventNames, HubEvents, SystemEventReducer } from "./Events";
import FlipNowHubConnection from "./FlipNowHubConnection";
import { ConnectionHubProviderContextType } from "./ConnectionHubProviderTypes";
import SystemEvents from "./Events/SystemEvents";

export const useConnectionHubContext = () => useContext(ConnectionHubProviderContext);

export function useLogs() {
  const { logs, setLogs } = useContext(ConnectionHubProviderContext);
  return { logs, setLogs } as const;
}

export function useSignalREvents<
  EventNames extends HubEventNames,
  Events extends HubEvents,
>(
  events: Record<EventNames, BaseCreateHubEvent<string, any, any>>,
  callback: <EventName extends EventNames>(
    event: EventName,
    ...args: Events[EventName]
  ) => ReturnType<FlipNowHubConnection['on']>
) {
  const connection = FlipNowHubConnection.getInstance();

  useEffect(() => {
    if (connection.callbacks.keyArr().some(([event]) => event in events)) return;
    Object.keysOf(Events).forEach((event) => {
      if (!(event in events)) return;

      const _callback = <EventName extends EventNames>(...args: Events[EventName]) => callback(event as EventName, ...args);
      connection.on(event, _callback);
    });

    console.log('Registered events', connection.callbacks.keyArr().map(([event]) => event));

    return () => connection.clear(Object.keysOf(Events));
  }, [connection, callback, events]);
}

export const useSystemEvents = (context: ConnectionHubProviderContextType) => useSignalREvents(
  SystemEvents, 
  (event, ...args) => SystemEventReducer(event, { args, ...context })
);