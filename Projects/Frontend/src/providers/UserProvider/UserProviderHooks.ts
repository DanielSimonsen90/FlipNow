import { useContext } from "react";
import { UserProviderContext } from "./UserProviderConstants";
import { UserProviderContextType } from "./UserProviderTypes";

export function useUser<
  AllowNullable extends boolean
>(nullable: AllowNullable = true as AllowNullable) {
  return useContext(UserProviderContext) as UserProviderContextType<AllowNullable>;
}

export function useUserWithPrompt() {
  const { user, createOrFind } = useUser();

  async function getUser() {
    if (user) return user;
    const username = prompt("What is your username?");
    if (!username) return null;

    return createOrFind(username);
  }

  return { user, getUser };
}