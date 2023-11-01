import { GameEventRegisterProps } from '../GameProviderTypes';
import { HubEventNames } from '../Hub';

import BroadcastFailedEvent from './broadcastFailed.event.game';
import LogEvent from './log.event.game';
import GameDeletedEvent from './gameDeleted.event.game';

export * from './_GameEventReducer';

export default {
  broadcastFailed: BroadcastFailedEvent,
  log: LogEvent,
  gameDeleted: GameDeletedEvent,
} as Record<HubEventNames, GameEventRegisterProps<any>>;