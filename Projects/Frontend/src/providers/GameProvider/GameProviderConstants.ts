import { createContext } from "react";

import { GameProviderContextType } from "./GameProviderTypes";

export const GameProviderContext = createContext<GameProviderContextType>({
  game: null,
  isClientTurn: false,
  dispatch: async (...args) => {},
  player: null,

  logs: [],
  setLogs: () => {},
});