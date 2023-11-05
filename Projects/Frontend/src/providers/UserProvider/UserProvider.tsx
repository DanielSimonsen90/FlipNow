import { useState, PropsWithChildren, useCallback, useMemo } from "react";

import useCacheEffect from "hooks/useCacheEffect";

import { 
  HubUserActionNames, HubUserActions, 
  UserActionReducer, UserActiontReducerProps 
} from "providers/ConnectionHubProvider/Actions/UserActions/Setup";

import { STORAGE, STORAGE_KEY, UserProviderContext } from "./UserProviderConstants";
import type { ProvidedUserType } from './UserProviderTypes';
import { useEffectOnce } from "danholibraryrjs";
import { useUserEvents } from "./UserProviderHooks";

let sentLoginRequest = false;

export default function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<ProvidedUserType>(null);
  const [loggingIn, setLoggingIn] = useState(false);
  const actionContext = useMemo(() => ({user, setLoggingIn }), [user, setLoggingIn]);
  const dispatch = useCallback(async <Action extends HubUserActionNames>(
    action: Action,
    ...args: HubUserActions[Action]
  ) => {
    await UserActionReducer(action, { ...actionContext, user, args } as UserActiontReducerProps<Action>);
  }, [user, actionContext]);

  useCacheEffect(user, { storage: STORAGE, key: STORAGE_KEY }, [user]);
  useUserEvents({ user, setUser, setLoggingIn });

  useEffectOnce(() => {
    const storedUser = STORAGE.getItem(STORAGE_KEY)
      ? JSON.parse(STORAGE.getItem(STORAGE_KEY) as string) as Exclude<ProvidedUserType, null>
      : null;
    if (!storedUser) return;
    if ('username' in storedUser && !sentLoginRequest) {
      sentLoginRequest = true;
      dispatch('login', storedUser.username);
    }
  })

  return (
    <UserProviderContext.Provider value={{
      user,
      loggingIn,
      setLoggingIn,
      dispatch
    }}>
      {children}
    </UserProviderContext.Provider>
  );
}