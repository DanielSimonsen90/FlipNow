import { Dispatch, SetStateAction, useContext } from "react";
import { GameProviderContext } from "./GameProviderConstants";
import { useUser } from "providers/UserProvider";
import { GameProviderContextType } from "./GameProviderTypes";
import { Request } from "utils";
import { ActiveGame } from "models/backend";
import { Nullable } from "types";
import { useAsyncEffect } from "danholibraryrjs";

export const useGame = () => useContext(GameProviderContext);

export async function useGetActiveGame(
  game: Nullable<ActiveGame>,
  setGame: Dispatch<SetStateAction<GameProviderContextType['game']>>
) {
  const { user } = useUser();

  useAsyncEffect(async () => {
    if (game && !user) return setGame(null); // User logged out or already has a game
    if (game || !user) return; // User already has a game or hasn't logged in

    const response = await Request<ActiveGame, string>(`games?userId=${user.id}`);
    if (!response.success) return console.error(response.text);

    setGame(response.data);
  }, [user]);
}