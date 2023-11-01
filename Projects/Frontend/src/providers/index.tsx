import { PropsWithChildren } from "react";
import UserProvider from "./UserProvider";
import GameProvider from "./GameProvider";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <UserProvider>
      <GameProvider>
        {children}
      </GameProvider>
    </UserProvider>
  );
}