import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "danholibraryrjs";

import { PlayState } from "models/backend";
import { getInviteUrlFromGame } from "utils";
import { useGame } from "providers/GameProvider";

import { ToggleButton } from "components/pages/Home/Buttons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

library.add(faCheck);

const COPY_TIMEOUT = 2000;

export default function InviteCode() {
  const [showCode, setShowCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const { game } = useGame(false);

  const copy = (text: string, setCopied: Dispatch<SetStateAction<boolean>>) => game && navigator.clipboard.writeText(text)
    .then(() => setCopied(true))
    .catch(alert);

  useEffect(() => {
    if (copiedCode) setTimeout(() => setCopiedCode(false), COPY_TIMEOUT);
    if (copiedLink) setTimeout(() => setCopiedLink(false), COPY_TIMEOUT);
  }, [copiedLink, copiedCode])

  return game.playState !== PlayState.PLAYING ? (
    <div id="invite-code">
      <p>
        Invite your friends!
        <Button importance="tertiary" onClick={() => copy(getInviteUrlFromGame(game), setCopiedLink)}>
          Copy link
          {copiedLink && (
            <span className="copied">
              <FontAwesomeIcon icon={faCheck} />
            </span>
          )}
        </Button>
        <span className="muted">or</span>
        <ToggleButton importance="tertiary" text="code" state={showCode} setState={setShowCode} />
      </p>
      {showCode && (
        <span onClick={() => copy(game.inviteCode, setCopiedCode)} id="inviteCode">
          {game.inviteCode}
          {copiedCode && (
            <span className="copied">
              <FontAwesomeIcon icon={faCheck} />
            </span>
          )}
        </span>
      )}
    </div>
  ) : null;
}