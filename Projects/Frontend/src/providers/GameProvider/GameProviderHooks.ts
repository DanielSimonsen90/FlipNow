import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { GameProviderContext } from "./GameProviderConstants";
import { useUser } from "providers/UserProvider";
import { GameProviderContextType } from "./GameProviderTypes";
import { Request } from "utils";
import { ActiveGame } from "models/backend";
import { Nullable, Promiseable } from "types";
import { useAsyncEffect } from "danholibraryrjs";
import Connection, { HubEvents } from './Hub';

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

export function useSingalREvent<EventName extends keyof HubEvents>(
  name: EventName, 
  callback: (...args: HubEvents[EventName]) => Promiseable<void>
) {
  useEffect(() => {
    Connection.on(name, callback);
    return () => Connection.off(name, callback);
  }, []);
}