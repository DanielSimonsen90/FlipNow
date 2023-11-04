import { User } from "models/backend";
import { HubUserActionNames, HubUserActions } from "providers/ConnectionHubProvider/Actions/UserActions/Setup";
import { Nullable } from "types";

export type ProvidedUserType = Nullable<User<true>>;

export type UserProviderContextType<AllowNullable extends boolean = true> = {
  user: AllowNullable extends true ? ProvidedUserType : User<true>;
  dispatch<Action extends HubUserActionNames>(
    action: Action,
    ...args: HubUserActions[Action]
  ): Promise<void>;
};