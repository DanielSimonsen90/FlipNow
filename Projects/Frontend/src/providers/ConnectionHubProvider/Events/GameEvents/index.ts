import { HubGameEventNames, GameEventRegisterProps } from './Setup/_GameEventTypes';

import CardFlippedEvent from './cardFlipped.event.game';
import GameDeletedEvent from './gameDeleted.event.game';
import GameEndedEvent from './gameEnded.event.game';
import GameSettingsUpdatedEvent from './gameSettingsUpdated.event.game';
import GameStartedEvent from './gameStarted.event.game';
import GameUpdatedEvent from './gameUpdated.event.game';
import PlayerJoinedEvent from './playerJoined.event.game';
import PlayerLeftEvent from './playerLeft.event.game';
import TurnExpiredEvent from './turnExpired.event.game';

const GameEvents = {
  cardFlipped: CardFlippedEvent,
  gameDeleted: GameDeletedEvent,
  gameEnded: GameEndedEvent,
  gameSettingsUpdated: GameSettingsUpdatedEvent,
  gameStarted: GameStartedEvent,
  gameUpdated: GameUpdatedEvent,
  playerJoined: PlayerJoinedEvent,
  playerLeft: PlayerLeftEvent,
  turnExpired: TurnExpiredEvent,
} as Record<HubGameEventNames, GameEventRegisterProps<HubGameEventNames>>;
export default GameEvents;