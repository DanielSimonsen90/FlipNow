import { User } from "models/backend";

export type ProvidedUserType = User<true> | null;

export type UserProviderContextType = {
  user: ProvidedUserType;
  createOrFind(username: string): Promise<void>;
};