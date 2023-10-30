import { useContext } from "react";
import { UserProviderContext } from "./UserProviderConstants";

export const useUser = () => useContext(UserProviderContext);