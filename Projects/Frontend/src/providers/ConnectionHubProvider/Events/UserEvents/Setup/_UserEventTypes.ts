import { User } from "models/backend";
import { ProvidedUserType } from "providers/UserProvider/UserProviderTypes";
import { Dispatch, SetStateAction } from "react";
import { Nullable } from "types";

export type HubUserEvents = {
  userLoggedIn: [succeeded: boolean, message: Nullable<string>, user: Nullable<User<true>>];
  userLoggedOut: [succeeded: true];
}
export type HubUserEventNames = keyof HubUserEvents;

export type UserEventProps<Event extends HubUserEventNames> = {
  user: ProvidedUserType;
  setUser: Dispatch<SetStateAction<ProvidedUserType>>;
  args: HubUserEvents[Event]
}

export type UserEventRegisterProps<Event extends HubUserEventNames> = {
  event: Event,
  callback: (props: UserEventProps<Event>) => Promise<void>;
}