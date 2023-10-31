import { ActiveGame, Player, User } from "models/backend";
import type { useUser } from "providers/UserProvider";
import { Nullable } from "types";
import { FlipNowHubConnection } from "./Hub/FlipNowHubConnection";

export type GameProviderContextType = {
  game: Nullable<ActiveGame>;
  isClientTurn: boolean;
  dispatch<Action extends GameAction>(
    action: Action,
    ...args: AdditionalActionProps[Action]
  ): Promise<void>

  logs: string[];
};

type GameLifeCycle = 'CREATE' | 'START' | 'STOP' | 'DELETE';
type PlayerLifeCycle = 'JOIN' | 'LEAVE' | 'KICK';
type GameEvents = 'FLIP';

export type GameAction = GameLifeCycle | PlayerLifeCycle | GameEvents;
export type GameActionProps<Action extends GameAction> =
  (Action extends 'CREATE' ? {
    game: Nullable<ActiveGame>;
  } : {
    broadcastToHub: ReturnType<FlipNowHubConnection['invokeHandlerLater']>;
  }) & ({
    user: NonNullable<ReturnType<typeof useUser>['user']>;
    game: ActiveGame;
    args: AdditionalActionProps[Action];
  });
  
export type GameActionRegisterProps<Action extends GameAction> = {
  action: Action,
  callback: (props: GameActionProps<Action>) => Promise<Nullable<ActiveGame>>;
};

export type AdditionalActionProps = {
  'CREATE': [];
  'START': [];
  'STOP': [];
  'DELETE': [];

  'JOIN': [user: User<false>, inviteCode?: string];
  'LEAVE': [player: Player];
  'KICK': [player: Player];

  'FLIP': [cardIndex: number];
};