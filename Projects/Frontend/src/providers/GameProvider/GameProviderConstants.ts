import { createContext } from "react";
import { Nullable } from "types";
import { ActiveGame } from "models/backend";

import Actions from './Actions';
import { GameActionProps, GameProviderContextType } from "./GameProviderTypes";
import Connection from "./Hub/FlipNowHubConnection";
import { HubActionNames, HubActions, HubEventNames } from "./Hub/HubEvents";

// TODO: Provide Player object to GameProviderContext
export const GameProviderContext = createContext<GameProviderContextType>({
  game: null,
  isClientTurn: false,
  dispatch: async (...args) => {},
  logs: []
});

export async function GameActionReducer<Action extends HubActionNames>(
  action: Action,
  { game, user, args }: GameActionProps<Action>
): Promise<void | ActiveGame> {
  if (!Actions[action]) throw new Error(`Invalid action: ${action}`);
  const { callback } = Actions[action];

  try {
    const update = await callback({ 
      game, user, args,
      broadcastToHub: Connection.invokeHandlerLater(action, game).bind(Connection) 
    });
    return update;

  } catch (error) {
    console.error(error);
  }
}