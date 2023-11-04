import { PropsWithChildren } from "react";

import ConnectionHubProvider from "./ConnectionHubProvider";
import UserProvider from "./UserProvider";
import GameProvider from "./GameProvider";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ConnectionHubProvider>
      <UserProvider>
        <GameProvider>
          {children}
        </GameProvider>
      </UserProvider>
    </ConnectionHubProvider>
  );
}