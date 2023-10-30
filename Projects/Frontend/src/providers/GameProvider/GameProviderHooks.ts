import { Dispatch, SetStateAction, useContext } from "react";
import { GameProviderContext } from "./GameProviderConstants";
import { useUser } from "providers/UserProvider";
import { GameProviderContextType } from "./GameProviderTypes";
import { Request } from "utils";
import { ActiveGame } from "models/backend";
import { Nullable } from "types";

export const useGame = () => useContext(GameProviderContext);

export async function useGetActiveGame(game: Nullable<ActiveGame>, setGame: Dispatch<SetStateAction<GameProviderContextType['game']>>) {
  const { user } = useUser();
  if (game || !user) return;

  const response = await Request<ActiveGame, string>(`games?userId=${user.id}`);
  if (!response.success) return console.error(response.text);

  setGame(response.data);
}