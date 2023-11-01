import { useState } from "react";
import { Button } from "danholibraryrjs";

import { PlayState } from "models/backend";
import { getInviteUrlFromGame } from "utils";
import { useGame } from "providers/GameProvider";

import { ToggleButton } from "components/pages/Home/Buttons";

export default function InviteCode() {
  const [showCode, setShowCode] = useState(false);
  const { game } = useGame(false);

  const copy = (text: string) => game && navigator.clipboard.writeText(text)
    .then(() => alert('Copied to clipboard'))
    .catch(alert);

  return game.playState !== PlayState.PLAYING ? (
    <div id="invite-code">
      <p>
        Invite your friends!
        <Button importance="tertiary" onClick={() => copy(getInviteUrlFromGame(game))}>Copy link</Button>
        <span className="muted">or</span>
        <ToggleButton importance="tertiary" text="code" state={showCode} setState={setShowCode} />
      </p>
      {showCode && (
        <span onClick={() => copy(game.inviteCode)} id="inviteCode">{game.inviteCode}</span>
      )}
    </div>
  ) : null;
}