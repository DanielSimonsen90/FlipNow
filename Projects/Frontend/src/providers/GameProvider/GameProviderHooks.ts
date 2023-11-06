import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { useAsyncEffect } from "danholibraryrjs";

import { Request } from "utils";
import { ActiveGame, Player } from "models/backend";
import { Nullable } from "types";

import { useUser } from "providers/UserProvider";

import { GameProviderContext, RegisterGameEvents } from "./GameProviderConstants";
import { GameProviderContextType } from "./GameProviderTypes";
import { ProvidedUserType } from "providers/UserProvider/UserProviderTypes";

export function useGame<
  AllowNullable extends boolean
>(nullable: AllowNullable = true as AllowNullable): GameProviderContextType<AllowNullable> {
  return useContext(GameProviderContext) as GameProviderContextType<AllowNullable>;
}

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

export function useUserLoggedOutWhileInGame(
  player: Nullable<Player>,
  dispatch: GameProviderContextType['dispatch']
) {
  const { user } = useUser();

  useEffect(() => {
    if (!user && player) dispatch('leaveGame', player.id);
  }, [user, dispatch, player]);
}

export const useGameEvents = (
  context: GameProviderContextType,
  setGame: Dispatch<SetStateAction<GameProviderContextType['game']>>,
  user: ProvidedUserType
) => useEffect(() => {
  RegisterGameEvents(context, setGame, user);
})