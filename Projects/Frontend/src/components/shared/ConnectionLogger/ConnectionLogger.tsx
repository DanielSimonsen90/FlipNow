import { ToggleButton } from "components/pages/Home/Buttons";
import { useGame } from "providers/GameProvider";
import { useState } from "react";

export default function ConnectionLogger() {
  const { logs, isHost } = useGame();
  const [showLogs, setShowLogs] = useState(isHost);

  return (
    <div className="connection-logger">
      <ToggleButton importance="tertiary" text="logs" state={showLogs} setState={setShowLogs} />
      {showLogs && (
        <article className="logs-container">
          <h1>SignalR log</h1>
          <ul>
            {logs.map(({ timestamp, message }) => (
              <li key={timestamp.getTime() + message}>[{timestamp.toLocaleTimeString()}] {message}</li>
            ))}
          </ul>
        </article>
      )}
    </div>
  );
}