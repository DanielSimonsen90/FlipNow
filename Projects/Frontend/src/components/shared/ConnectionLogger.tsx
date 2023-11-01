import { useGame } from "providers/GameProvider";

export default function ConnectionLogger() {
  const { logs } = useGame();

  return (
    <article>
      <h1>SignalR log</h1>
      <ul style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        listStyle: 'none',
        paddingLeft: '1em'
      }}>
        {logs.map(({ timestamp, message }) => (
          <li key={timestamp.getTime()}>[{timestamp.toLocaleTimeString()}] {message}</li>
        ))}
      </ul>
    </article>
  );
}