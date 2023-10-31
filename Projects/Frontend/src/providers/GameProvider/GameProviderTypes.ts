import { ActiveGame, Player, User } from "models/backend";
import type { useUser } from "providers/UserProvider";
import { Nullable } from "types";
import { FlipNowHubConnection } from "./Hub/FlipNowHubConnection";
import { HubActionNames, HubActions } from "./Hub/HubEvents";

export type GameProviderContextType = {
  game: Nullable<ActiveGame>;
  isClientTurn: boolean;
  dispatch<Action extends HubActionNames>(
    action: Action,
    ...args: HubActions[Action]
  ): Promise<void>

  logs: string[];
};

export type GameActionProps<Action extends HubActionNames> =
  (Action extends 'createGame' ? {
    game: Nullable<ActiveGame>;
  } : {
    broadcastToHub: ReturnType<FlipNowHubConnection['invokeHandlerLater']>;
  }) & ({
    user: NonNullable<ReturnType<typeof useUser>['user']>;
    game: ActiveGame;
    args: HubActions[Action];
  });
  
export type GameActionRegisterProps<Action extends HubActionNames> = {
  action: Action,
  callback: (props: GameActionProps<Action>) => Promise<Nullable<ActiveGame>>;
};