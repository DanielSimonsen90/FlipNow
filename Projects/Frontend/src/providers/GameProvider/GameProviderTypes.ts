import { ActiveGame } from "models/backend";
import type { useUser } from "providers/UserProvider";
import { Nullable } from "types";
import { FlipNowHubConnection } from "./Hub/FlipNowHubConnection";
import { HubActionNames, HubActions, HubEventNames, HubEvents } from "./Hub/HubTypes";
import { Dispatch, SetStateAction } from "react";

export type GameProviderContextType = {
  game: Nullable<ActiveGame>;
  isClientTurn: boolean;
  dispatch<Action extends HubActionNames>(
    action: Action,
    ...args: HubActions[Action]
  ): Promise<void>;

  logs: string[];
  setLogs: Dispatch<SetStateAction<string[]>>;
};

// #region Actions
export type GameActionProps<Action extends HubActionNames> = {
  user: NonNullable<ReturnType<typeof useUser>['user']>;
  game: Action extends 'createGame' | 'joinGame' ? Nullable<ActiveGame> : ActiveGame;
  args: HubActions[Action];

  broadcastToHub: Action extends 'createGame' ? never : ReturnType<FlipNowHubConnection['sendHandlerLater']>;
};

export type GameActionRegisterProps<Action extends HubActionNames> = {
  action: Action,
  callback: (props: GameActionProps<Action>) => Promise<void | ActiveGame>;
};
// #endregion Actions

// #region Events
export type GameEventProps<Event extends HubEventNames> = {
  context: Omit<GameProviderContextType, 'dispatch'>;
  user: NonNullable<ReturnType<typeof useUser>['user']>;
  args: HubEvents[Event];
};

export type GameEventRegisterProps<Event extends HubEventNames> = {
  event: Event,
  callback: (props: GameEventProps<Event>) => Promise<Nullable<ActiveGame>>;
};
// #endregion Events