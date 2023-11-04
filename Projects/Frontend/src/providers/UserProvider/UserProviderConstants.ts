import { createContext } from "react";
import type { UserProviderContextType } from "./UserProviderTypes";

export const STORAGE_KEY = "User";
export const STORAGE = window.localStorage;

export const UserProviderContext = createContext<UserProviderContextType>({
  user: null,
  dispatch: async () => {}
});