import { useState } from "react";
import { Button } from "danholibraryrjs";

import { useLogs } from "providers/ConnectionHubProvider";
import { useGame } from "providers/GameProvider";

import { ToggleButton } from "components/pages/Home/Buttons";

export default function ConnectionLogger() {
  const { isHost } = useGame();
  const { logs, setLogs } = useLogs();
  const [showLogs, setShowLogs] = useState(isHost);

  return (
    <div className="connection-logger">
      <ToggleButton importance="tertiary" text="logs" state={showLogs} setState={setShowLogs} />
      {showLogs && (
        <article className="logs-container">
          <header>
            <h1>SignalR log</h1>
            <Button disabled={!logs.length} importance="secondary" onClick={() => setLogs([])}>Clear log</Button>
          </header>
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