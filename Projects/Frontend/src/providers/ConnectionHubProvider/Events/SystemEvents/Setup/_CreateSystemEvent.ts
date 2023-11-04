import { BaseCreateHubEvent } from "../../HubEventTypes";
import { HubSystemEventNames, SystemEventProps } from "./_SystemEventTypes";

export default function CreateSystemEvent<Event extends HubSystemEventNames>(
  event: Event,
  callback: (props: SystemEventProps<Event>) => Promise<void>,
): BaseCreateHubEvent<Event, SystemEventProps<Event>, void> {
  return {
    event,
    callback,
  };
}