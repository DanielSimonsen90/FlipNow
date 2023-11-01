import CreateGameButton from "../Buttons/CreateGameButton";
import { InviteInput } from "./components";

export default function DefaultHome() {
  return (
    <main>
      <h1>You are not playing a game??</h1>
      <CreateGameButton />
      <span id="or-seperator">or</span>
      <InviteInput />
    </main>
  );
}