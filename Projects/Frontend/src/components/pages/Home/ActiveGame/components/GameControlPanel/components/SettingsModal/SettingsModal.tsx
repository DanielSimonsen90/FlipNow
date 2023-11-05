import { Button, useEffectOnce } from "danholibraryrjs";

import Input from "components/shared/Input";
import { useGame } from "providers/GameProvider";

type Props = {
  modalRef: React.RefObject<HTMLDialogElement>;
};

export default function SettingsModal({ modalRef }: Props) {
  const { game: { settings, maxPlayersAllowed }, dispatch } = useGame(false);

  useEffectOnce(() => {
    const listener = (e: MouseEvent) => {
      if (e.target === modalRef.current || (e.target as HTMLElement).classList.contains('close')) {
        modalRef.current?.close();
      }
    }
    document.addEventListener('click', listener);
    return () => document.removeEventListener('click', listener);
  });

  return (
    <dialog ref={modalRef} className="game-settings">
      <form className="modal-content" onSubmit={e => {
        e.preventDefault();
        
        const updatedSettings = {
          ...settings,
          ...Object.fromEntries(new FormData(e.target as HTMLFormElement))
        };

        dispatch('updateSettings', updatedSettings);
        modalRef.current?.close();
      }}>
        <h1>Game settings</h1>
        <Input group label model={settings} name="lobbyName" />
        <Input group label model={settings} type="number" name="lobbyLimit" />
        <Input group label model={settings} type="number" name="cards" />
        <div className="button-container">
          <Button type="button" importance="tertiary" className="close" value="Close" />
          <input type="submit" value="Update settings" />
        </div>
      </form>
    </dialog>
  );
}