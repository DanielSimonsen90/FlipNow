import { BaseActionProps } from "../../HubActionTypes";

export type HubUserActions = {
  login: [username: string]
  logout: []
}
export type HubUserActionNames = keyof HubUserActions;

export type UserActionProps<Action extends HubUserActionNames> = BaseActionProps<Action> & {
  args: HubUserActions[Action];
}

export type UserActionRegisterProps<Action extends HubUserActionNames> = {
  action: Action,
  callback: (props: UserActionProps<Action>) => Promise<void>;
}