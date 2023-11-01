import { ToggleButton } from "components/pages/Home/Buttons";
import { useGame } from "providers/GameProvider";
import { useState } from "react";

export default function ConnectionLogger() {
  const [showLogs, setShowLogs] = useState(false);
  const { logs } = useGame();

  return (
    <div className="connection-logger">
      <ToggleButton importance="tertiary" text="logs" state={showLogs} setState={setShowLogs} />
      {showLogs && (
        <article className="logs-container">
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
      )}
    </div>
  );
}