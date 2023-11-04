import { ActiveGame } from "models/backend";
import { Nullable } from "types";

import { GameProviderContextType } from "providers/GameProvider/GameProviderTypes";
import { BaseActionProps, BroadcastToHub } from "../../HubActionTypes";
import { ProvidedUserType } from "providers/UserProvider/UserProviderTypes";

/**
 * These events are emitted to the server from the client
 * Client => Server
 */
export type HubGameActions = {
  createGame: [];
  startGame: [];
  endGame: [];
  deleteGame: [];

  joinGame: [inviteCode: string, userId: string];
  leaveGame: [playerId: string];

  flipCard: [cardIndex: number];
};
export type HubGameActionNames = keyof HubGameActions;

export type GameActionProps<Action extends HubGameActionNames> = Omit<BaseActionProps<Action>, 'broadcastToHub'> & {
  user: Exclude<ProvidedUserType, null>;
  args: HubGameActions[Action];

  broadcastToHub: Action extends 'createGame' ? never : BroadcastToHub<Action>;
} & Omit<GameProviderContextType<false>, 'dispatch' | 'game'> & {
  game: Action extends 'joinGame' | 'createGame' ? Nullable<ActiveGame> : ActiveGame;
};

export type GameActionRegisterProps<Action extends HubGameActionNames> = {
  action: Action,
  callback: (props: GameActionProps<Action>) => Promise<void | ActiveGame>;
};