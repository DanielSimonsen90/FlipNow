import { createContext } from "react";
import type { ProvidedUserType, UserProviderContextType } from "./UserProviderTypes";
import { Request } from "utils/ApiUtil";

export const STORAGE_KEY = "User";
export const STORAGE = window.localStorage;

export const UserProviderContext = createContext<UserProviderContextType>({
  user: null,
  createOrFind: async (username: string) => {},
})

export async function createOrFind(username: string): Promise<ProvidedUserType> {
  const response = await Request<ProvidedUserType, string>(`users/${username}`);
  if (response.success) return response.data;

  console.error(response.text);
  return null;
}