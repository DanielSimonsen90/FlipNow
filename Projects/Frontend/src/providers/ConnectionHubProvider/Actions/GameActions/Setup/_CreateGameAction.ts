import { GameActionRegisterProps, HubGameActionNames } from "./_GameActionTypes";

export default function CreateGameAction<Action extends HubGameActionNames>(
  action: Action, 
  callback: GameActionRegisterProps<Action>['callback'],
) {
  return {
    action,
    callback,
  }
}