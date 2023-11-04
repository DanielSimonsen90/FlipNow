import { HubUserActionNames, UserActionRegisterProps } from "./_UserActionTypes";

export default function CreateUserAction<Action extends HubUserActionNames>(
  action: Action,
  callback: UserActionRegisterProps<Action>['callback'],
) {
  return {
    action,
    callback,
  }
}