import { useState } from "react";
import { Button } from "danholibraryrjs";

import { useLogs } from "providers/ConnectionHubProvider";

import { ToggleButton } from "components/pages/Home/Buttons";

export default function ConnectionLogger() {
  const { logs, setLogs } = useLogs();
  const [showLogs, setShowLogs] = useState(false);

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