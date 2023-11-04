import { ActiveGame } from "models/backend";
import Actions from "../";
import { GameActionProps, HubGameActionNames } from "./_GameActionTypes";   
import Connection, { FlipNowHubConnection } from "providers/ConnectionHubProvider/FlipNowHubConnection";

export type GameActiontReducerProps<Action extends HubGameActionNames> = Omit<GameActionProps<Action>, 'broadcastToHub'>;

export default async function GameActionReducer<Action extends HubGameActionNames>(
  action: Action,
  { game, user, args, ...context }: GameActiontReducerProps<Action>
): Promise<void | ActiveGame> {
  if (!Actions[action]) throw new Error(`Invalid action: ${action}`);
  const { callback } = Actions[action];
  console.log(`[${action}]`, args);

  try {
    const update = await callback({
      game, user, args,
      ...context,
      broadcastToHub: Connection.sendHandlerLater(action, game ?? { inviteCode: args[0] as string })
        .bind(Connection) as ReturnType<FlipNowHubConnection['sendHandlerLater']>
    });
    return update;
  } catch (error) {
    console.error(error);
  }
}