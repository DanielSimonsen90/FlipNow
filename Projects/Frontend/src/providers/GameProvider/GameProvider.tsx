import { useState, PropsWithChildren, useCallback } from 'react';

import { Nullable } from 'types';
import { ActiveGame } from 'models/backend';
import { useUser } from 'providers/UserProvider';

import { GameProviderContext, GameActionReducer } from './GameProviderConstants';
import { GameActionProps } from './GameProviderTypes';
import { useGetActiveGame, useSingalREvent } from './GameProviderHooks';
import { HubActionNames, HubActions } from './Hub';

export default function GameProvider({ children }: PropsWithChildren) {
  const [game, setGame] = useState<Nullable<ActiveGame>>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const { user } = useUser();

  const isClientTurn = game?.turnPlayer.user.username === user?.username;
  const dispatch = useCallback(async <Action extends HubActionNames>(
    action: Action, 
    ...args: HubActions[Action]
  ) => {
    if (!user) throw new Error('User not logged in');

    const update = await GameActionReducer(action, { 
      user, game, args 
    } as GameActionProps<Action>);
    if (update) setGame(update);

  }, [user, game]);

  // TODO: GameEventReducer

  useGetActiveGame(game, setGame);

  useSingalREvent('log', message => setLogs((logs) => [...logs, message]));

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