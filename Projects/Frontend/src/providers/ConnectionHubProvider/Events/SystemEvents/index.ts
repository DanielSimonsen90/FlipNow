import { HubSystemEventNames, SystemEventRegisterProps } from './Setup';

import BroadCastFailedEvent from './broadcastFailed.event.system';
import LogEvent from './log.event.system';

const SystemEvents = {
  broadcastFailed: BroadCastFailedEvent,
  log: LogEvent,
} as Record<HubSystemEventNames, SystemEventRegisterProps<HubSystemEventNames>>;

export default SystemEvents;