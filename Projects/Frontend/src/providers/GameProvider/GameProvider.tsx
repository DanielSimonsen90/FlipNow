import { useState, PropsWithChildren, useCallback, useEffect } from 'react';

import { Nullable } from 'types';
import { ActiveGame } from 'models/backend';
import { useUser } from 'providers/UserProvider';

import { GameProviderContext, GameReducer } from './GameProviderConstants';
import { AdditionalActionProps, GameAction, GameActionProps } from './GameProviderTypes';
import { useGetActiveGame } from './GameProviderHooks';

import Connection from './Hub/FlipNowHubConnection';

export default function GameProvider({ children }: PropsWithChildren) {
  const [game, setGame] = useState<Nullable<ActiveGame>>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const { user } = useUser();

  const isClientTurn = game?.turnPlayer.user.username === user?.username;
  const dispatch = useCallback(async <Action extends GameAction>(
    action: Action, 
    ...args: AdditionalActionProps[Action]
  ) => {
    if (!user) throw new Error('User not logged in');

    const updatedGame = await GameReducer(action, { 
      user, game, args 
    } as GameActionProps<Action>);
    setGame(updatedGame);
  }, [user, game]);

  useGetActiveGame(game, setGame);

  useEffect(() => {
    console.log('Connection', Connection);
    const callback = (message: string) => {
      setLogs((logs) => [...logs, message]);
    };
    Connection.on('log', callback);
    return () => {
      Connection.off('log', callback);
    }
  }, [])

  return (
    <GameProviderContext.Provider value={{
      game,
      isClientTurn,
      dispatch,
      logs
    }}>
      {children}
    </GameProviderContext.Provider>
  );
}