import { useContext } from "react";
import { UserProviderContext } from "./UserProviderConstants";
import { UserProviderContextType } from "./UserProviderTypes";

export function useUser<
  AllowNullable extends boolean
>(nullable: AllowNullable = true as AllowNullable) {
  return useContext(UserProviderContext) as UserProviderContextType<AllowNullable>;
}