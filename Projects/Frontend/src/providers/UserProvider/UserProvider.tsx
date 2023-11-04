import { useState, PropsWithChildren, useCallback, useMemo } from "react";

import useCacheEffect from "hooks/useCacheEffect";

import { 
  HubUserActionNames, HubUserActions, 
  UserActionReducer, UserActiontReducerProps 
} from "providers/ConnectionHubProvider/Actions/UserActions/Setup";

import { STORAGE, STORAGE_KEY, UserProviderContext } from "./UserProviderConstants";
import type { ProvidedUserType } from './UserProviderTypes';
import { useConnectionHub } from "providers/ConnectionHubProvider";

export default function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<ProvidedUserType>(STORAGE.getItem(STORAGE_KEY) ? JSON.parse(STORAGE.getItem(STORAGE_KEY) as string) : null);
  const connection = useConnectionHub();

  const actionContext = useMemo(() => ({
    connection, user
  }), [user, connection]);

  const dispatch = useCallback(async <Action extends HubUserActionNames>(
    action: Action,
    ...args: HubUserActions[Action]
  ) => {
    const update = await UserActionReducer(action, { ...actionContext, user, args } as UserActiontReducerProps<Action>);
    if (update) setUser(update);
  }, [user, actionContext]);

  useCacheEffect(user, { storage: STORAGE, key: STORAGE_KEY }, [user]);

  return (
    <UserProviderContext.Provider value={{
      user,
      dispatch
    }}>
      {children}
    </UserProviderContext.Provider>
  );
}