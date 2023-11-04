import { FlipNowHubConnection } from "../FlipNowHubConnection";
import { HubGameActions } from "./GameActions/Setup";
import { HubUserActions } from "./UserActions/Setup/_UserActionTypes";

export type BaseActionProps<Action extends HubActionNames> = {
  broadcastToHub: ReturnType<FlipNowHubConnection['sendHandlerLater']>;
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