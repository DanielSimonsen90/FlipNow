import { HubUserActionNames, UserActionRegisterProps } from "./Setup/_UserActionTypes";

import LoginUserAction from "./login.action.user";
import LogoutUserAction from "./logout.action.user";

export default {
  login: LoginUserAction,
  logout: LogoutUserAction,
} as Record<HubUserActionNames, UserActionRegisterProps<any>>