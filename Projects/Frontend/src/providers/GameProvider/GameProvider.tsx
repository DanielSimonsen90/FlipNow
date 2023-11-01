import { useState, PropsWithChildren, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router';

import { Nullable } from 'types';
import { ActiveGame } from 'models/backend';
import { useUser } from 'providers/UserProvider';

import { GameProviderContext } from './GameProviderConstants';
import { GameActionProps, GameProviderContextType, Log } from './GameProviderTypes';
import { useGetActiveGame, useSignalREvents } from './GameProviderHooks';

import { HubActionNames, HubActions } from './Hub';
import { GameActionReducer } from './Hub/Actions';

export default function GameProvider({ children }: PropsWithChildren) {
  const [game, setGame] = useState<Nullable<ActiveGame>>(null);
  const [logs, setLogs] = useState<Array<Log>>([]);
  const { user } = useUser();
  const navigate = useNavigate();

  const isClientTurn = game?.turnPlayer?.user.username === user?.username;
  const player = useMemo(() => {
    if (!game || !user) return null;
    return game.players.find(p => p.user.username === user.username) ?? null;
  }, [game, user]);

  const actionContext = useMemo(() => ({
    game, isClientTurn, player, 
    logs, setLogs
  }), [game, isClientTurn, player, logs, setLogs]);

  const dispatch = useCallback(async <Action extends HubActionNames>(
    action: Action,
    ...args: HubActions[Action]
  ) => {
    if (!user) throw new Error('User not logged in');

    const update = await GameActionReducer(action, { 
      ...actionContext, user, args 
    } as GameActionProps<Action>);
    
    if (update) setGame(update);
  }, [user, game, navigate]);

  const contextValue: GameProviderContextType = {
    ...actionContext,
    dispatch
  };

  useSignalREvents(contextValue, setGame, user);
  useGetActiveGame(game, setGame);

  return (
    <GameProviderContext.Provider value={contextValue}>
      {children}
    </GameProviderContext.Provider>
  );
}