import { ProvidedUserType } from "providers/UserProvider/UserProviderTypes";
import { BaseActionProps } from "../../HubActionTypes";
import { Dispatch, SetStateAction } from "react";

export type HubUserActions = {
  login: [username: string]
  logout: []
}
export type HubUserActionNames = keyof HubUserActions;

export type UserActionProps<Action extends HubUserActionNames> = BaseActionProps<Action> & {
  user: ProvidedUserType;
  setLoggingIn: Dispatch<SetStateAction<boolean>>;
  args: HubUserActions[Action];
}

export type UserActionRegisterProps<Action extends HubUserActionNames> = {
  action: Action,
  callback: (props: UserActionProps<Action>) => Promise<void>;
}

export type UserActiontReducerProps<Action extends HubUserActionNames> = Omit<UserActionProps<Action>, 'broadcastToHub'>;