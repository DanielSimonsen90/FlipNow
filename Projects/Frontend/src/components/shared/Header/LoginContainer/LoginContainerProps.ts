import { useUser } from "providers/UserProvider/UserProviderHooks";

export type LoginContainerProps = ReturnType<typeof useUser> & {
  className: string
};