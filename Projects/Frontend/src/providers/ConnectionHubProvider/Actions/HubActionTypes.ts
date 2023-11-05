import { HubGameActions } from "./GameActions/Setup";
import { HubUserActions } from "./UserActions/Setup/_UserActionTypes";

export type BroadcastToHub<Action extends HubActionNames> = (...args: HubActions[Action]) => Promise<void>;

export type BaseActionProps<Action extends HubActionNames> = {
  broadcastToHub: BroadcastToHub<Action>;
}

export type BaseCreateHubAction<
  Action extends HubActionNames,
  Props extends BaseActionProps<Action>,
  ReturnType extends any
> = {
  action: Action;
  callback: (props: Props) => Promise<ReturnType>;
}

export type HubActions = HubGameActions & HubUserActions;
export type HubActionNames = keyof HubActions;