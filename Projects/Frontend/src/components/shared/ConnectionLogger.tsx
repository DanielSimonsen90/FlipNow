import { useGame } from "providers/GameProvider";

export default function ConnectionLogger() {
  const { logs } = useGame();

  return (
    <article>
      <h1>SignalR log</h1>
      <ul>
        {logs.map((log, i) => (
          <li key={log}>{log}</li>
        ))}
      </ul>
    </article>
  );
}