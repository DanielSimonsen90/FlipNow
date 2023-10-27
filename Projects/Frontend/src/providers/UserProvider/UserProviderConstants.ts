import { createContext } from "react";
import { UserProviderContextType } from "./UserProviderTypes";

export const UserProviderContext = createContext<UserProviderContextType>({
  user: null,
  createOrFind: async (username: string) => null,
})