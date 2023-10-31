import { GameAction, GameActionRegisterProps } from "../GameProviderTypes";

export default function CreateGameAction<Action extends GameAction>(
  action: Action, 
  callback: GameActionRegisterProps<Action>['callback'],
) {
  return {
    action,
    callback,
  }
}