import { HubUserEventNames, UserEventRegisterProps } from './Setup/_UserEventTypes'

import UserLoggedInEvent from './userLoggedIn.event.user';
import UserLoggedOutEvent from './userLoggedOut.event.user';

export default {
  userLoggedIn: UserLoggedInEvent,
  userLoggedOut: UserLoggedOutEvent,
} as Record<HubUserEventNames, UserEventRegisterProps<any>>;