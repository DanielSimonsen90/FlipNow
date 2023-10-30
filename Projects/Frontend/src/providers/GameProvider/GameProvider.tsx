import { useState, PropsWithChildren, useCallback } from 'react';

import { Nullable } from 'types';
import { ActiveGame } from 'models/backend';
import { useUser } from 'providers/UserProvider';

import { GameProviderContext, GameReducer } from './GameProviderConstants';
import { GameAction } from './GameProviderTypes';
import { useGetActiveGame } from './GameProviderHooks';

export default function GameProvider({ children }: PropsWithChildren) {
  const [game, setGame] = useState<Nullable<ActiveGame>>(null);
  const { user } = useUser();
  const isClientTurn = game?.turnPlayer.user.username === user?.username;
  const dispatch = useCallback(async (action: GameAction) => {
    if (!user) throw new Error('User not logged in');

    const updatedGame = await GameReducer(user, game, action);
    setGame(updatedGame);
  }, [user, game]);

  useGetActiveGame(game, setGame);

  return (
    <GameProviderContext.Provider value={{
      game,
      isClientTurn,
      dispatch
    }}>
      {children}
    </GameProviderContext.Provider>
  );
}