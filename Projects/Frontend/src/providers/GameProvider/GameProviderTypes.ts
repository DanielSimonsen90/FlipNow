import { ActiveGame, Player } from "models/backend";
import type { useUser } from "providers/UserProvider";
import { Nullable } from "types";

export type GameProviderContextType = {
  game: Nullable<ActiveGame>;
  isClientTurn: boolean;
  dispatch(action: GameAction): void;
}

type GameLifeCycle = 'CREATE' | 'START' | 'STOP' | 'DELETE';
type PlayerLifeCycle = 'JOIN' | 'LEAVE' | 'KICK';
type GameEvents = 'FLIP';

export type GameAction = GameLifeCycle | PlayerLifeCycle | GameEvents;
export type GameActionProps<Action extends GameAction> = {
  action: Action,
  callback: (
    game: Action extends 'CREATE' ? Nullable<ActiveGame> : ActiveGame,
    user: NonNullable<ReturnType<typeof useUser>['user']>,
    ...args: AdditionalActionProps[Action]
  ) => Promise<Nullable<ActiveGame>>;
}

export type AdditionalActionProps = {
  'CREATE': [];
  'START': [];
  'STOP': [];
  'DELETE': [];
  
  'JOIN': [player: Player];
  'LEAVE': [player: Player];
  'KICK': [player: Player];

  'FLIP': [cardIndex: number];
}