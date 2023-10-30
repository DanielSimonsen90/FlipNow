import { useState, PropsWithChildren, useCallback } from "react";

import { STORAGE, STORAGE_KEY, UserProviderContext, createOrFind as _createOrFind } from "./UserProviderConstants";
import type { ProvidedUserType } from './UserProviderTypes';
import useCacheEffect from "hooks/useCacheEffect";

export default function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<ProvidedUserType>(STORAGE.getItem(STORAGE_KEY) ? JSON.parse(STORAGE.getItem(STORAGE_KEY) as string) : null);
  const createOrFind = useCallback((username: string) => _createOrFind(username).then(setUser), [setUser]);
  useCacheEffect(user, { storage: STORAGE, key: STORAGE_KEY }, [user]);

  return (
    <UserProviderContext.Provider value={{
      user,
      createOrFind
    }}>
      {children}
    </UserProviderContext.Provider>
  );
}