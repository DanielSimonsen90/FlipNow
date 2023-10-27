import { useState, PropsWithChildren } from "react";
import { UserProviderContext } from "./UserProviderConstants";
import type { ProvidedUserType } from './UserProviderTypes';

export default function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<ProvidedUserType>(null);
  
  return (
    <UserProviderContext.Provider value={{
      user,
      createOrFind
    }}>
      {children}
    </UserProviderContext.Provider>
  )
}

function createOrFind(username: string): Promise<ProvidedUserType> {
}