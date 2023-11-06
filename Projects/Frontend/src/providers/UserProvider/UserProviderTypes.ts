import { User } from "models/backend";
import { HubUserActionNames, HubUserActions } from "providers/ConnectionHubProvider/Actions/UserActions/Setup";
import { Dispatch, SetStateAction } from "react";
import { Nullable } from "types";

export type ProvidedUserType = Nullable<User<true>>;

export type UserProviderContextType<AllowNullable extends boolean = true> = {
  user: AllowNullable extends true ? ProvidedUserType : User<true>;
  loggingIn: boolean;
  setLoggingIn: Dispatch<SetStateAction<boolean>>;
  dispatch<Action extends HubUserActionNames>(
    action: Action,
    ...args: HubUserActions[Action]
  ): Promise<void>;
};