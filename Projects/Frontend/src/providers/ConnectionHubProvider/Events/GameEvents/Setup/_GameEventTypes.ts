import { Nullable } from "types";
import { ActiveGame, Player } from "models/backend";

import { GameProviderContextType } from "providers/GameProvider/GameProviderTypes";
import { ProvidedUserType } from "providers/UserProvider/UserProviderTypes";

/**
 * These events are emitted to the client from the server
 * Server => Client
 */
export type HubGameEvents = {
  gameStarted: [inviteCode: string, game: ActiveGame];

  cardFlipped: [inviteCode: string, game: ActiveGame];
  gameUpdated: [inviteCode: string, game: ActiveGame];
  turnExpired: [inviteCode: string, game: ActiveGame, turnPlayerAffected: Player];

  // gameReset: [inviteCode: string, game: ActiveGame];
  gameEnded: [inviteCode: string, game: ActiveGame];
  gameDeleted: [];

  playerJoined: [inviteCode: string, game: ActiveGame];
  playerLeft: [inviteCode: string, game: ActiveGame];
};
export type HubGameEventNames = keyof HubGameEvents;

type GameEventPropsArgs<Event extends HubGameEventNames> =
  HubGameEvents[Event] extends [inviteCode: string, ...args: infer Args]
  ? Args
  : any[];


export type GameEventProps<Event extends HubGameEventNames> = {
  user: NonNullable<ProvidedUserType>;
  args: GameEventPropsArgs<Event>;
} & Omit<GameProviderContextType, 'dispatch'>;

export type GameEventRegisterProps<Event extends HubGameEventNames> = {
  event: Event,
  callback: (props: GameEventProps<Event>) => Promise<Nullable<ActiveGame>>;
};