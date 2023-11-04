import { HubEventNames, BaseCreateHubEvent } from './HubEventTypes';
import GameEvents from './GameEvents';
import HubEvents from './SystemEvents';
import UserEvents from './UserEvents';

export default {
  ...GameEvents,
  ...HubEvents,
  ...UserEvents
} as Record<HubEventNames, BaseCreateHubEvent<string, any, any>>;

export * from './HubEventTypes';

export * from './SystemEvents/Setup';
export * from './GameEvents/Setup';
export * from './UserEvents/Setup';