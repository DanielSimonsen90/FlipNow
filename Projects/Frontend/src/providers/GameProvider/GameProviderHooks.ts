import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { useAsyncEffect } from "danholibraryrjs";

import { Request } from "utils";
import { ActiveGame, Player } from "models/backend";
import { useUser } from "providers/UserProvider";
import { ProvidedUserType } from "providers/UserProvider/UserProviderTypes";
import { Nullable } from "types";

import { GameProviderContext } from "./GameProviderConstants";
import { GameEventProps, GameProviderContextType } from "./GameProviderTypes";
import Connection, { HubEventNames, HubEvents } from './Hub';
import Events, { GameEventReducer } from "./Hub/Events";

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

const Callbacks: Map<string, Function> = new Map();

export function useSignalREvents(
  context: GameProviderContextType, 
  setGame: Dispatch<SetStateAction<GameProviderContextType['game']>>, 
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
          ...context,
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

export function useUserLoggedOutWhileInGame(
  player: Nullable<Player>,
  dispatch: GameProviderContextType['dispatch']
) {
  const { user } = useUser();

  useEffect(() => {
    if (!user && player) dispatch('leaveGame', player.id);
  }, [user, dispatch, player]);
}