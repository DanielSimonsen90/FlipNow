import { useState, PropsWithChildren, useCallback, useEffect } from 'react';

import { Nullable } from 'types';
import { ActiveGame } from 'models/backend';
import { useUser } from 'providers/UserProvider';

import { Connection, GameProviderContext, GameReducer } from './GameProviderConstants';
import { AdditionalActionProps, GameAction, GameActionProps } from './GameProviderTypes';
import { useGetActiveGame } from './GameProviderHooks';
import { useAsyncEffect } from 'danholibraryrjs';

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

  useAsyncEffect(async () => {
    await Connection.start();
    Connection.on('log', (log: string) => {
      setLogs((logs) => [...logs, log]);
    });
    return () => Connection.stop();
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