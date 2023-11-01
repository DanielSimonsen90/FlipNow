import { createContext } from "react";

import { GameProviderContextType } from "./GameProviderTypes";

// TODO: Provide Player object to GameProviderContext
export const GameProviderContext = createContext<GameProviderContextType>({
  game: null,
  isClientTurn: false,
  dispatch: async (...args) => {},
  player: null,

  logs: [],
  setLogs: () => {},
});