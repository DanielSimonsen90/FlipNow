import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { GameProviderContext } from "./GameProviderConstants";
import { useUser } from "providers/UserProvider";
import { GameEventProps, GameProviderContextType } from "./GameProviderTypes";
import { Request } from "utils";
import { ActiveGame } from "models/backend";
import { Nullable, Promiseable } from "types";
import { useAsyncEffect } from "danholibraryrjs";
import Connection, { HubEventNames, HubEvents } from './Hub';
import Events, { GameEventReducer } from "./Events";
import { ProvidedUserType } from "providers/UserProvider/UserProviderTypes";

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

// TODO: Unused for now
export function useSingalREvent<EventName extends keyof HubEvents>(
  name: EventName, 
  callback: (...args: HubEvents[EventName]) => Promiseable<void>
) {
  useEffect(() => {
    Connection.on(name, callback);
    return () => Connection.off(name, callback);
  }, [name, callback]);
}
const Callbacks: Map<string, Function> = new Map();

export function useSignalREvents(
  context: GameProviderContextType, 
  setGame: Dispatch<SetStateAction<typeof context['game']>>, 
  user: ProvidedUserType
) {
  useEffect(() => {
    Object.keys(Events).forEach(event => {
      const callback = Events[event as keyof typeof Events];
      if (!callback) throw new Error(`Event ${event} not found`);

      const _callback = async (...args: HubEvents[HubEventNames]) => {
        const inviteCode = args.shift();
        // if (!context.game) throw new Error(`No game stored for event ${event}, ${JSON.stringify([inviteCode, ...args])}`)
        if (context.game && context.game.inviteCode !== inviteCode) return console.log(
          `Received event unhandled due to invalid invite code (${context.game?.inviteCode} !== ${inviteCode})`,
          { inviteCode, context, args, event }
        ); // Update not meant for client

        const update = await GameEventReducer(event as HubEventNames, {
          context,
          user, args
        } as GameEventProps<any>);
        setGame(update);
      };

      Connection.on(event as HubEventNames, _callback);
      Callbacks.set(event, _callback);
    });

    return () => {
      Callbacks.forEach((callback, event) => Connection.off(event as HubEventNames, callback as any));
      Callbacks.clear();
    };
  }, [context, setGame, user]);
}