import { HubSystemEventNames, SystemEventRegisterProps } from './Setup';

import BroadCastFailedEvent from './broadcastFailed.event.system';
import LogEvent from './log.event.system';

export default {
  broadcastFailed: BroadCastFailedEvent,
  log: LogEvent,
} as Record<HubSystemEventNames, SystemEventRegisterProps<any>>;