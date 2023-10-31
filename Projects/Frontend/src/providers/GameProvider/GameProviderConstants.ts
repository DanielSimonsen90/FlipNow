import { createContext } from "react";
import { Nullable } from "types";
import { ActiveGame } from "models/backend";

import Actions from './Actions';
import { GameActionProps, GameEventProps, GameProviderContextType } from "./GameProviderTypes";
import Connection, { FlipNowHubConnection } from "./Hub/FlipNowHubConnection";
import { HubActionNames, HubEventNames } from "./Hub/HubTypes";
import Events from "./Events";

// TODO: Provide Player object to GameProviderContext
export const GameProviderContext = createContext<GameProviderContextType>({
  game: null,
  isClientTurn: false,
  dispatch: async (...args) => {},
  logs: [],
  setLogs: () => {},
});

export async function GameActionReducer<Action extends HubActionNames>(
  action: Action,
  { game, user, args }: GameActionProps<Action>
): Promise<void | ActiveGame> {
  if (!Actions[action]) throw new Error(`Invalid action: ${action}`);
  const { callback } = Actions[action];
  console.log(`[${action}]: ${JSON.stringify(args)}`)

  try {
    const update = await callback({ 
      game, user, args,
      broadcastToHub: Connection.sendHandlerLater(action, game ?? { inviteCode: args[0] as string  })
        .bind(Connection) as ReturnType<FlipNowHubConnection['sendHandlerLater']>
    });
    return update;
  } catch (error) {
    console.error(error);
  }
}

export async function GameEventReducer<Event extends HubEventNames>(
  event: Event,
  { context, user, args }: GameEventProps<Event>
): Promise<Nullable<ActiveGame>> {
  if (!Events[event]) throw new Error(`Invalid event: ${event}`);
  const { callback } = Events[event];
  console.log(`[${event}]: ${JSON.stringify(args)}`)

  try {
    const update = await callback({ context, user, args });
    return update;

  } catch (error) {
    console.error(error);
    return context.game;
  }
}