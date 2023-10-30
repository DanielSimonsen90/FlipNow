import { useContext } from "react";
import { GameProviderContext } from "./GameProviderConstants";

export const useGame = () => useContext(GameProviderContext);