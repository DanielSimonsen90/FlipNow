import { HubGameEvents } from "./GameEvents/Setup";
import { HubSystemEvents } from "./SystemEvents/Setup";
import { HubUserEvents } from "./UserEvents/Setup";

export type BaseCreateHubEvent<
  Event extends string,
  Props extends any, 
  ReturnType extends any
> = {
  event: Event;
  callback: (props: Props) => Promise<ReturnType>;
}

export type HubEvents = HubGameEvents & HubSystemEvents & HubUserEvents;
export type HubEventNames = keyof HubEvents;