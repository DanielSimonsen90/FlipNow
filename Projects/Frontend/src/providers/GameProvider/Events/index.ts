import { GameEventRegisterProps } from '../GameProviderTypes';
import { HubEventNames } from '../Hub';

import BroadcastFailedEvent from './broadcastFailed.event.game';
import GameDeletedEvent from './gameDeleted.event.game';
import LogEvent from './log.event.game';
import PlayerJoinedEvent from './playerJoined.event.game';
import PlayerLeftEvent from './playerLeft.event.game';

export * from './_GameEventReducer';

export default {
  broadcastFailed: BroadcastFailedEvent,
  gameDeleted: GameDeletedEvent,
  log: LogEvent,
  playerJoined: PlayerJoinedEvent,
  playerLeft: PlayerLeftEvent,
} as Record<HubEventNames, GameEventRegisterProps<any>>;