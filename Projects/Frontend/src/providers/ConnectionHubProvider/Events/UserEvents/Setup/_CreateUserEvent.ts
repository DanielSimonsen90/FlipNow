import { HubUserEventNames, UserEventProps, UserEventRegisterProps } from "./_UserEventTypes";

export default function CreateUserEvent<Event extends HubUserEventNames>(
  event: Event,
  callback: (props: UserEventProps<Event>) => Promise<void>,
): UserEventRegisterProps<Event> {
  return {
    event,
    callback,
  };
}