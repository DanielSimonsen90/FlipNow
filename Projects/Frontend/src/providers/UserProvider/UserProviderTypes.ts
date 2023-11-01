import { User } from "models/backend";
import { Nullable } from "types";

export type ProvidedUserType = Nullable<User<true>>;

export type UserProviderContextType<AllowNullable extends boolean = true> = {
  user: AllowNullable extends true ? ProvidedUserType : User<true>;
  createOrFind(username: string): Promise<void>;
  logout(): void;
};