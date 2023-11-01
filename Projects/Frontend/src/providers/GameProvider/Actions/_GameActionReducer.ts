import { ActiveGame } from "models/backend";
import Actions from ".";
import { GameActionProps } from "../GameProviderTypes";
import Connection, { FlipNowHubConnection, HubActionNames } from "../Hub";

export async function GameActionReducer<Action extends HubActionNames>(
  action: Action,
  { game, user, args }: GameActionProps<Action>
): Promise<void | ActiveGame> {
  if (!Actions[action]) throw new Error(`Invalid action: ${action}`);
  const { callback } = Actions[action];
  console.log(`[${action}]: ${JSON.stringify(args)}`);

  try {
    const update = await callback({
      game, user, args,
      broadcastToHub: Connection.sendHandlerLater(action, game ?? { inviteCode: args[0] as string })
        .bind(Connection) as ReturnType<FlipNowHubConnection['sendHandlerLater']>
    });
    return update;
  } catch (error) {
    console.error(error);
  }
}