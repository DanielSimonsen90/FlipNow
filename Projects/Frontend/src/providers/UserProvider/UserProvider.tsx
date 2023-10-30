import { useState, PropsWithChildren, useCallback } from "react";

import { UserProviderContext, createOrFind as _createOrFind } from "./UserProviderConstants";
import type { ProvidedUserType } from './UserProviderTypes';

export default function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<ProvidedUserType>(null);
  const createOrFind = useCallback((username: string) => _createOrFind(username).then(setUser), [setUser]);

  return (
    <UserProviderContext.Provider value={{
      user,
      createOrFind
    }}>
      {children}
    </UserProviderContext.Provider>
  );
}