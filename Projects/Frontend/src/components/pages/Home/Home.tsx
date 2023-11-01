import { useGame } from "providers/GameProvider";
import ActiveGame from "./ActiveGame";
import Default from "./Default";

export default function Home() {
  const { game } = useGame();
  return game ? <ActiveGame /> : <Default />;
}