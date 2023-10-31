import { useState, PropsWithChildren, useCallback, useEffect } from 'react';

import { Nullable } from 'types';
import { ActiveGame } from 'models/backend';
import { useUser } from 'providers/UserProvider';

import { GameProviderContext, GameActionReducer, GameEventReducer } from './GameProviderConstants';
import { GameActionProps, GameEventProps } from './GameProviderTypes';
import { useGetActiveGame, useSingalREvent } from './GameProviderHooks';
import Connection, { HubActionNames, HubActions, HubEventNames, HubEvents } from './Hub';
import Events from './Events';
import { useNavigate } from 'react-router';

const Callbacks: Map<string, Function> = new Map();

export default function GameProvider({ children }: PropsWithChildren) {
  const [game, setGame] = useState<Nullable<ActiveGame>>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const { user } = useUser();
  const navigate = useNavigate();

  const isClientTurn = game?.turnPlayer.user.username === user?.username;
  const dispatch = useCallback(async <Action extends HubActionNames>(
    action: Action, 
    ...args: HubActions[Action]
  ) => {
    if (!user) throw new Error('User not logged in');

    const update = await GameActionReducer(action, { user, game, args } as GameActionProps<Action>);
    if (update) {
      navigate(`/invite/${update.inviteCode}`);
    }
  }, [user, game, navigate]);

  useEffect(() => {
    console.group('Event Registration')
    console.log(Events);
    
    Object.keys(Events).forEach(event => {
      const callback = Events[event as keyof typeof Events];
      if (!callback) throw new Error(`Event ${event} not found`);

      const _callback = async (...args: HubEvents[HubEventNames]) => {
        const update = await GameEventReducer(event as HubEventNames, {
          context: { game, isClientTurn, logs, setLogs },
          user, args
        } as GameEventProps<any>);
        setGame(update);
      }
      
      Connection.on(event as HubEventNames, _callback);
      Callbacks.set(event, _callback);
    });
    console.groupEnd();

    return () => {
      console.group('Event Unregistration')
      Callbacks.forEach((callback, event) => Connection.off(event as HubEventNames, callback as any));
      Callbacks.clear();
      console.groupEnd();
    }
  }, [game, logs, user, isClientTurn]);

  useGetActiveGame(game, setGame);

  useSingalREvent('log', message => setLogs((logs) => [...logs, message]));

  return (
    <GameProviderContext.Provider value={{
      isClientTurn,
      game, dispatch,
      logs, setLogs
    }}>
      {children}
    </GameProviderContext.Provider>
  );
}