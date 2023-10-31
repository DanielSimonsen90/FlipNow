import { createContext } from "react";
import { Nullable } from "types";
import { ActiveGame } from "models/backend";

import Actions from './Actions';
import { GameAction, GameActionProps, GameProviderContextType } from "./GameProviderTypes";
import Connection from "./Hub/FlipNowHubConnection";
import { HubEventNames } from "./Hub/HubEvents";

// TODO: Provide Player object to GameProviderContext
export const GameProviderContext = createContext<GameProviderContextType>({
  game: null,
  isClientTurn: false,
  dispatch: async (...args) => {},
  logs: []
});

export const getHubEventFromAction = (action: GameAction): Nullable<HubEventNames> => {
  switch (action) {
    case 'CREATE': return null;
    case 'DELETE': return 'deleteGame';
    case 'JOIN': return 'joinGame';
    case 'LEAVE': return 'leaveGame';
    case 'KICK': return 'leaveGame'; // Consider adding a 'KickPlayer' event
    case 'START': return 'startGame';
    case 'STOP': return 'endGame';
    case 'FLIP': return 'flipCard';
    default: return null;
  }
}

export async function GameReducer<Action extends GameAction>(
  action: Action,
  { game, user, args }: GameActionProps<Action>
): Promise<Nullable<ActiveGame>> {
  if (!Actions[action]) throw new Error(`Invalid action: ${action}`);
  const { callback } = Actions[action];

  try {
    const eventName = getHubEventFromAction(action);
    const update = await callback({ 
      game, user, args,
      broadcastToHub: eventName 
        ? Connection.invokeHandlerLater(eventName, game).bind(Connection) 
        : undefined,
    });

    return update;
  } catch (error) {
    console.error(error);
    return game;
  }
}