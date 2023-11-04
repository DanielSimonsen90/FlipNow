import { useState, PropsWithChildren, useCallback, useMemo } from "react";

import useCacheEffect from "hooks/useCacheEffect";

import { 
  HubUserActionNames, HubUserActions, 
  UserActionReducer, UserActiontReducerProps 
} from "providers/ConnectionHubProvider/Actions/UserActions/Setup";

import { STORAGE, STORAGE_KEY, UserProviderContext } from "./UserProviderConstants";
import type { ProvidedUserType } from './UserProviderTypes';
import { useConnectionHub } from "providers/ConnectionHubProvider";
import { useEffectOnce } from "danholibraryrjs";
import { useUserEvents } from "./UserProviderHooks";

export default function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<ProvidedUserType>(null);
  const connection = useConnectionHub();
  const actionContext = useMemo(() => ({ connection, user }), [user, connection]);
  const dispatch = useCallback(async <Action extends HubUserActionNames>(
    action: Action,
    ...args: HubUserActions[Action]
  ) => {
    await UserActionReducer(action, { ...actionContext, user, args } as UserActiontReducerProps<Action>);
  }, [user, actionContext]);

  useCacheEffect(user, { storage: STORAGE, key: STORAGE_KEY }, [user]);
  useUserEvents({ user, setUser });

  useEffectOnce(() => {
    const storedUser = STORAGE.getItem(STORAGE_KEY)
      ? JSON.parse(STORAGE.getItem(STORAGE_KEY) as string) as Exclude<ProvidedUserType, null>
      : null;
    if (!storedUser) return;
    if ('username' in storedUser) dispatch('login', storedUser.username);
  })

  return (
    <UserProviderContext.Provider value={{
      user,
      dispatch
    }}>
      {children}
    </UserProviderContext.Provider>
  );
}