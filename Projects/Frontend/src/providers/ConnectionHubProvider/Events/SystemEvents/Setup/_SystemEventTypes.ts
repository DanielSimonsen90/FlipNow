import { ConnectionHubProviderContextType } from "providers/ConnectionHubProvider/ConnectionHubProviderTypes";
import { Nullable } from "types";

export type HubSystemEvents = {
  broadcastFailed: [message: string, inviteCode: Nullable<string>];
  log: [timestamp: string, message: string, inviteCode: Nullable<string>];
};

export type HubSystemEventNames = keyof HubSystemEvents;

export type SystemEventProps<Event extends HubSystemEventNames> = ConnectionHubProviderContextType & {
  args: HubSystemEvents[Event];
};
export type SystemEventRegisterProps<Event extends HubSystemEventNames> = {
  event: Event;
  callback: (props: SystemEventProps<Event>) => Promise<any>;
}