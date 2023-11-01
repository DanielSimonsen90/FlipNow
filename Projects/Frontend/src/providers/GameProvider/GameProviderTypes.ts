import { ActiveGame, Player } from "models/backend";
import type { useUser } from "providers/UserProvider";
import { Nullable } from "types";
import { FlipNowHubConnection } from "./Hub/FlipNowHubConnection";
import { HubActionNames, HubActions, HubEventNames, HubEvents } from "./Hub/HubTypes";
import { Dispatch, SetStateAction } from "react";

export type Log = {
  timestamp: Date;
  message: string;
}

export type GameProviderContextType<AllowNullable extends boolean = true> = {
  game: AllowNullable extends true ? Nullable<ActiveGame> : ActiveGame;
  player: AllowNullable extends true ? Nullable<Player> : Player;
  isClientTurn: boolean;
  dispatch<Action extends HubActionNames>(
    action: Action,
    ...args: HubActions[Action]
  ): Promise<void>;

  logs: Log[];
  setLogs: Dispatch<SetStateAction<Log[]>>;
};

// #region Actions
export type GameActionProps<Action extends HubActionNames> = {
  user: NonNullable<ReturnType<typeof useUser>['user']>;
  args: HubActions[Action];

  broadcastToHub: Action extends 'createGame' ? never : ReturnType<FlipNowHubConnection['sendHandlerLater']>;
} & Omit<GameProviderContextType<false>, 'dispatch' | 'game'> & {
  game: Action extends 'joinGame' | 'createGame' ? Nullable<ActiveGame> : ActiveGame;
}

export type GameActionRegisterProps<Action extends HubActionNames> = {
  action: Action,
  callback: (props: GameActionProps<Action>) => Promise<void | ActiveGame>;
};
// #endregion Actions

// #region Events
// HubEvents[Event]; without the first argument
type GameEventPropsArgs<Event extends HubEventNames> = 
  HubEvents[Event] extends [arg1: any, ...args: infer Args]
  ? Args 
  : never;
  

export type GameEventProps<Event extends HubEventNames> = {
  user: NonNullable<ReturnType<typeof useUser>['user']>;
  args: GameEventPropsArgs<Event>;
} & Omit<GameProviderContextType, 'dispatch'>;

export type GameEventRegisterProps<Event extends HubEventNames> = {
  event: Event,
  callback: (props: GameEventProps<Event>) => Promise<Nullable<ActiveGame>>;
};
// #endregion Events