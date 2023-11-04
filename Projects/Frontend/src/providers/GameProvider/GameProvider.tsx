import { useState, PropsWithChildren, useCallback, useMemo } from 'react';

import { Nullable } from 'types';
import { ActiveGame } from 'models/backend';
import { useUser } from 'providers/UserProvider';

import { GameProviderContext } from './GameProviderConstants';
import { GameActionProps, GameProviderContextType, Log } from './GameProviderTypes';
import { useGetActiveGame, useSignalREvents, useUserLoggedOutWhileInGame } from './GameProviderHooks';

import { HubActionNames, HubActions } from 'services/Hub';
import { GameActionReducer } from 'services/Hub/Actions';

export default function GameProvider({ children }: PropsWithChildren) {
  const [game, setGame] = useState<Nullable<ActiveGame>>(null);
  const [logs, setLogs] = useState<Array<Log>>([]);
  const { user } = useUser();

  const isClientTurn = game?.turn.player?.user.username === user?.username;
  const isHost = useMemo(() => game?.host.user.id === user?.id, [game, user])
  const player = useMemo(() => {
    if (!game || !user) return null;
    return game.players.find(p => p.user.username === user.username) ?? null;
  }, [game, user]);

  const actionContext = useMemo(() => ({
    game, isClientTurn, player, isHost,
    logs, setLogs
  }), [game, isClientTurn, player, logs, setLogs, isHost]);

  const dispatch = useCallback(async <Action extends HubActionNames>(
    action: Action,
    ...args: HubActions[Action]
  ) => {
    if (!user) throw new Error('User not logged in');

    const update = await GameActionReducer(action, { 
      ...actionContext, user, args 
    } as GameActionProps<Action>);
    
    if (update) setGame(update);
  }, [user, actionContext]);

  const contextValue: GameProviderContextType = {
    ...actionContext,
    dispatch
  };

  useSignalREvents(contextValue, setGame, user);
  useGetActiveGame(game, setGame);
  useUserLoggedOutWhileInGame(player, dispatch);

  return (
    <GameProviderContext.Provider value={contextValue}>
      {children}
    </GameProviderContext.Provider>
  );
}