import { HubSystemEventNames, SystemEventProps } from "./_SystemEventTypes";

export default async function SystemEventReducer<Event extends HubSystemEventNames>(
  event: Event,
  callback: (props: SystemEventProps<Event>) => Promise<void>,
): Promise<void> {
  throw new Error('Not implemented');
}