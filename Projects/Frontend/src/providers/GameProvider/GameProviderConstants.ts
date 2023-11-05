import { Dispatch, SetStateAction, createContext } from "react";

import { GameProviderContextType } from "./GameProviderTypes";

import FlipNowHubConnection from "providers/ConnectionHubProvider/FlipNowHubConnection";
import GameEvents from "providers/ConnectionHubProvider/Events/GameEvents";
import { GameEventProps, GameEventReducer, HubEventNames } from "providers/ConnectionHubProvider/Events";
import { ProvidedUserType } from "providers/UserProvider/UserProviderTypes";

export const GameProviderContext = createContext<GameProviderContextType>({
  game: null,
  isClientTurn: false,
  isHost: false,
  dispatch: async (...args) => { },
  player: null,
});

export const RegisterGameEvents = (
  context: GameProviderContextType,
  setGame: Dispatch<SetStateAction<GameProviderContextType['game']>>,
  user: ProvidedUserType
) => FlipNowHubConnection.getInstance().reigster(GameEvents, async (event, ...args) => {
  const inviteCode = args.shift();
  // if (!context.game) throw new Error(`No game stored for event ${event}, ${JSON.stringify([inviteCode, ...args])}`)

  // Update not meant for client
  if (context.game && context.game.inviteCode !== inviteCode) return console.log(
    `Received event unhandled due to invalid invite code (${context.game?.inviteCode} !== ${inviteCode})`,
    { inviteCode, context, args, event }
  );

  const update = await GameEventReducer(event as HubEventNames, {
    ...context,
    user, args
  } as GameEventProps<any>);
  setGame(update);
});