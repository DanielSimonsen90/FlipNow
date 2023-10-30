import { GameAction, GameActionProps } from "../GameProviderTypes";

export default function CreateGameAction<Action extends GameAction>(
  action: Action, 
  callback: GameActionProps<Action>['callback'],
) {
  return {
    action,
    callback,
  }
}