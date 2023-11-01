import { GameActionRegisterProps } from "../GameProviderTypes";
import { HubActionNames } from "../Hub";

export default function CreateGameAction<Action extends HubActionNames>(
  action: Action, 
  callback: GameActionRegisterProps<Action>['callback'],
) {
  return {
    action,
    callback,
  }
}