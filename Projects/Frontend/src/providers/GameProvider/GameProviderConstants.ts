import { createContext } from "react";
import { Nullable } from "types";
import { ActiveGame } from "models/backend";

import Actions from './Actions';
import { AdditionalActionProps, GameAction, GameActionProps, GameProviderContextType } from "./GameProviderTypes";

export const GameProviderContext = createContext<GameProviderContextType>({
  game: null,
  isClientTurn: false,
  dispatch: () => {},
});

export async function GameReducer<Action extends GameAction>(
  user: Parameters<GameActionProps<Action>['callback']>['1'],
  game: Parameters<GameActionProps<Action>['callback']>['0'],
  action: Action,
  ...args: AdditionalActionProps[Action]
): Promise<Nullable<ActiveGame>> {
  if (!Actions[action]) throw new Error(`Invalid action: ${action}`);
  const { callback } = Actions[action];

  try {
    const update = await callback(game, user, ...args);

    // TODO: Broadcast update

    return update;
  } catch (error) {
    console.error(error);
    return game;
  }
}