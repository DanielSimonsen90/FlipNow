import { useTimeout } from "danholibraryrjs";
import { PlayState } from "models/backend";
import { useGame } from "providers/GameProvider";
import { useState } from "react";

export default function TurnTeller() {
  const { game, isClientTurn } = useGame(false);
  const [secondsSpent, setSecondsSpent] = useState(0);
  const started = game.playState === PlayState.PLAYING;
  const turnPlayername = game.turn.player?.user.username ?? "Nobody";

  const { reset, clear } = useTimeout(() => {
    if (started) setSecondsSpent(v => v + 1);
  }, 1000);

  if (started) reset();
  else clear();

  return started ? (
    <div className="turn-teller" data-is-turn={isClientTurn}>
      <h3>{isClientTurn ? 'Your' : `${turnPlayername}'s`} turn</h3>
      <p>Seconds elapsed: {secondsSpent}</p>
    </div>
  ) : null;
}