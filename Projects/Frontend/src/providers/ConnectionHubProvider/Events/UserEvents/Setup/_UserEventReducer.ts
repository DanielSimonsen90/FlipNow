import { UserEventProps, HubUserEventNames } from './_UserEventTypes'

export default async function UserEventReducer<Event extends HubUserEventNames>(
  event: Event,
  callback: (props: UserEventProps<Event>) => Promise<void>,
): Promise<void> {
  throw new Error('Not implemented');
}