import CreateGameButton from "../Buttons/CreateGameButton";

export default function DefaultHome() {
  return (
    <main>
      <h1>You are not playing a game??</h1>
      <CreateGameButton />
      <span id="or-seperator">or</span>
      <input type="text" placeholder="Insert ivnite code" />
    </main>
  );
}