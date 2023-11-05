import { Button } from "danholibraryrjs";

import Input from "components/shared/Input";
import { useGame } from "providers/GameProvider";
import Modal from "components/shared/Modal";

type Props = {
  modalRef: React.RefObject<HTMLDialogElement>;
};

export default function SettingsModal({ modalRef }: Props) {
  const { game: { settings, maxPlayersAllowed }, dispatch } = useGame(false);

  return (
    <Modal modalRef={modalRef} className="game-settings">
      <form onSubmit={e => {
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
        <Input group label model={settings} type="number" name="lobbyLimit" max={maxPlayersAllowed} />
        <Input group label model={settings} type="number" name="cards" />
        <div className="button-container reverse">
          <input type="submit" value="Update settings" />
          <Button type="button" importance="tertiary" className="close" value="Close" />
        </div>
      </form>
    </Modal>
  );
}