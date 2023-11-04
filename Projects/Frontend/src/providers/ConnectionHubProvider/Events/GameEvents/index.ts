import { HubGameEventNames, GameEventRegisterProps } from './Setup/_GameEventTypes';

import CardFlippedEvent from './cardFlipped.event.game';
import GameDeletedEvent from './gameDeleted.event.game';
import GameEndedEvent from './gameEnded.event.game';
import GameStartedEvent from './gameStarted.event.game';
import GameUpdatedEvent from './gameUpdated.event.game';
import PlayerJoinedEvent from './playerJoined.event.game';
import PlayerLeftEvent from './playerLeft.event.game';
import TurnExpiredEvent from './turnExpired.event.game';

export default {
  cardFlipped: CardFlippedEvent,
  gameDeleted: GameDeletedEvent,
  gameEnded: GameEndedEvent,
  gameStarted: GameStartedEvent,
  gameUpdated: GameUpdatedEvent,
  playerJoined: PlayerJoinedEvent,
  playerLeft: PlayerLeftEvent,
  turnExpired: TurnExpiredEvent,
} as Record<HubGameEventNames, GameEventRegisterProps<any>>;