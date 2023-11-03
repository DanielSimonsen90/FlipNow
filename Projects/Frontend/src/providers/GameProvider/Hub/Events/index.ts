import { GameEventRegisterProps } from '../../GameProviderTypes';
import { HubEventNames } from '..';

import BroadcastFailedEvent from './broadcastFailed.event.game';

import CardFlippedEvent from './cardFlipped.event.game';
import GameDeletedEvent from './gameDeleted.event.game';
import GameEndedEvent from './gameEnded.event.game';
import GameStartedEvent from './gameStarted.event.game';
import GameUpdatedEvent from './gameUpdated.event.game';

import LogEvent from './log.event.game';

import PlayerJoinedEvent from './playerJoined.event.game';
import PlayerLeftEvent from './playerLeft.event.game';

import TurnExpiredEvent from './turnExpired.event.game';

export * from './_GameEventReducer';

export default {
  broadcastFailed: BroadcastFailedEvent,
  cardFlipped: CardFlippedEvent,
  gameDeleted: GameDeletedEvent,
  gameEnded: GameEndedEvent,
  gameStarted: GameStartedEvent,
  gameUpdated: GameUpdatedEvent,
  log: LogEvent,
  playerJoined: PlayerJoinedEvent,
  playerLeft: PlayerLeftEvent,
  turnExpired: TurnExpiredEvent,
} as Record<HubEventNames, GameEventRegisterProps<any>>;