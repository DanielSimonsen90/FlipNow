import { useState, PropsWithChildren, useCallback, useMemo } from 'react';

import { Nullable } from 'types';
import { ActiveGame } from 'models/backend';
import { useUser } from 'providers/UserProvider';

import { GameActionReducer, HubGameActionNames, HubGameActions } from 'providers/ConnectionHubProvider/Actions/GameActions/Setup';
import { GameActiontReducerProps } from 'providers/ConnectionHubProvider/Actions/GameActions/Setup/_GameActionReducer';

import { GameProviderContext } from './GameProviderConstants';
import { useGameEvents, useGetActiveGame, useUserLoggedOutWhileInGame } from './GameProviderHooks';
import { GameProviderContextType } from './GameProviderTypes';
import FlipNowHubConnection from 'providers/ConnectionHubProvider/FlipNowHubConnection';

export default function GameProvider({ children }: PropsWithChildren) {
  const [game, setGame] = useState<Nullable<ActiveGame>>(null);
  const { user } = useUser();
  const connection = FlipNowHubConnection.getInstance();

  const isClientTurn = game?.turn.player?.user.username === user?.username;
  const isHost = useMemo(() => game?.host.user.id === user?.id, [game, user]);
  const player = useMemo(() => {
    if (!game || !user) return null;
    return game.players.find(p => p.user.username === user.username) ?? null;
  }, [game, user]);

  const actionContext = useMemo(() => ({
    game, isClientTurn, player, isHost, connection,
  }), [game, isClientTurn, player, isHost, connection]);

  const dispatch = useCallback(async <Action extends HubGameActionNames>(
    action: Action,
    ...args: HubGameActions[Action]
  ) => {
    if (!user) throw new Error('User not logged in');

    const update = await GameActionReducer(action, { ...actionContext, user, args } as GameActiontReducerProps<Action>);
    if (update) setGame(update);
  }, [user, actionContext]);

  const contextValue: GameProviderContextType = {
    ...actionContext,
    dispatch
  };

  useGameEvents(contextValue, setGame, user);
  useGetActiveGame(game, setGame);
  useUserLoggedOutWhileInGame(player, dispatch);

  return (
    <GameProviderContext.Provider value={contextValue}>
      {children}
    </GameProviderContext.Provider>
  );
}