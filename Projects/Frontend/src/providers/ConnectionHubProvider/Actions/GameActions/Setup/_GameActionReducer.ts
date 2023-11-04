import { ActiveGame } from "models/backend";
import Actions from "../";
import { GameActionProps, HubGameActionNames } from "./_GameActionTypes";   

export type GameActiontReducerProps<Action extends HubGameActionNames> = Omit<GameActionProps<Action>, 'broadcastToHub'>;

export default async function GameActionReducer<Action extends HubGameActionNames>(
  action: Action,
  { game, user, args, connection, ...props }: GameActiontReducerProps<Action>
): Promise<void | ActiveGame> {
  if (!Actions[action]) throw new Error(`Invalid action: ${action}`);
  const { callback } = Actions[action];
  console.log(`[${action}]`, args);

  try {
    const update = await callback({
      game, user, args, connection,
      ...props,
      broadcastToHub: (...args) => connection.send(action, ...[game?.inviteCode, ...args] as any)
    });
    return update;
  } catch (error) {
    console.error(error);
  }
}