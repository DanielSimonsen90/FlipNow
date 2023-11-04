import Events from '../';
import { UserEventProps, HubUserEventNames } from './_UserEventTypes'

export default async function UserEventReducer<Event extends HubUserEventNames>(
  event: Event,
  props: UserEventProps<Event>,
): Promise<void> {
  if (!Events[event]) throw new Error(`Invalid event: ${event}`);

  const { callback } = Events[event];
  console.log(`[${event}]`, props.args);

  try {
    await callback(props);
  } catch (error) {
    console.error(error);
  }
}