import { ActiveGame } from "models/backend";
import Actions from "../";
import { GameActionProps, HubGameActionNames } from "./_GameActionTypes";
import FlipNowHubConnection from "providers/ConnectionHubProvider/FlipNowHubConnection";

export type GameActiontReducerProps<Action extends HubGameActionNames> = Omit<GameActionProps<Action>, 'broadcastToHub'>;

export default async function GameActionReducer<Action extends HubGameActionNames>(
  action: Action,
  { game, user, args, ...props }: GameActiontReducerProps<Action>
): Promise<void | ActiveGame> {
  if (!Actions[action]) throw new Error(`Invalid action: ${action}`);
  const { callback } = Actions[action];
  // console.log(`[${action}]`, args);
  const connection = FlipNowHubConnection.getInstance();

  return await callback({
    game, user, args, ...props,
    broadcastToHub: (...args) => game?.inviteCode
      ? connection.send(action, ...[game.inviteCode, ...args] as any)
      : connection.send(action, ...args)
  });
}