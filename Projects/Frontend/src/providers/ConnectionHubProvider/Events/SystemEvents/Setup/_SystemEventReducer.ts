import SystemEvents from "..";
import { HubSystemEventNames, SystemEventProps } from "./_SystemEventTypes";

export default async function SystemEventReducer<Event extends HubSystemEventNames>(
  event: Event,
  props: SystemEventProps<Event>,
): Promise<void> {
  if (!SystemEvents[event]) throw new Error(`Invalid event: ${event}`);

  const { callback } = SystemEvents[event];
  console.log(`[${event}]`, props);

  try {
    await callback(props);
  } catch (error) {
    console.error(error);
  }
}