import { useState, PropsWithChildren, useCallback } from 'react';
import { useNavigate } from 'react-router';

import { Nullable } from 'types';
import { ActiveGame } from 'models/backend';
import { useUser } from 'providers/UserProvider';

import { GameProviderContext } from './GameProviderConstants';
import { GameActionProps, GameProviderContextType } from './GameProviderTypes';
import { useGetActiveGame, useSignalREvents } from './GameProviderHooks';

import { HubActionNames, HubActions } from './Hub';
import { GameActionReducer } from './Actions';

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

  const contextValue: GameProviderContextType = {
    game, dispatch,
    isClientTurn,
    logs, setLogs
  }

  useSignalREvents(contextValue, setGame, user);
  useGetActiveGame(game, setGame);

  return (
    <GameProviderContext.Provider value={contextValue}>
      {children}
    </GameProviderContext.Provider>
  );
}