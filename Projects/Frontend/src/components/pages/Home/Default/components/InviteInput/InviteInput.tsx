import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'danholibraryrjs';
import { useGame } from 'providers/GameProvider';
import { useUser, useUserWithPrompt } from 'providers/UserProvider';

library.add(faSearch);

export default function InviteInput() {
  const { getUser } = useUserWithPrompt();
  const { dispatch } = useGame();

  async function onSubmit(e?: React.FormEvent<HTMLFormElement>) {
    e?.preventDefault();

    const inviteCode = (e?.target as HTMLFormElement)?.inviteCode?.value as string;
    const user = await getUser();
    if (!user) return;

    dispatch('joinGame', inviteCode, user.id);
  }

  return (
    <form className="invite-input-container" onSubmit={onSubmit}>
      <input name="inviteCode" type="text" placeholder="Insert invite code" onKeyDown={e => {
        if (['Enter', 'NumpadEnter'].includes(e.key)) {
          onSubmit();
        }
      }} />
      <Button type="submit" importance="tertiary">
        <FontAwesomeIcon icon={faSearch} />
      </Button>
    </form>
  );
}