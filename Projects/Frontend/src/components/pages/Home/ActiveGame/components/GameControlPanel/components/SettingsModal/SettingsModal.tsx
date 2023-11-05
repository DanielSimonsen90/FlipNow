import { Button } from "danholibraryrjs";

import Input from "components/shared/Input";
import { useGame } from "providers/GameProvider";
import Modal from "components/shared/Modal";
import { GameSettings } from "models/backend/GameSettings";
import { useRef } from "react";

type Props = {
  modalRef: React.RefObject<HTMLDialogElement>;
};

export default function SettingsModal({ modalRef }: Props) {
  const { game: { settings, maxPlayersAllowed, maxCardsAllowed }, dispatch } = useGame(false);
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current || !formRef.current.checkValidity()) return;
    const data = Array.from(formRef.current.querySelectorAll<HTMLInputElement>('input[id]')).reduce((acc, input) => {
      acc[input.id.replace('input-', '')] = input.value;
      return acc;
    }, {} as any);

    const updatedSettings: GameSettings = {
      lobbyName: data.lobbyName || settings.lobbyName,
      lobbyLimit: parseInt(data.lobbyLimit) || settings.lobbyLimit,
      cards: parseInt(data.cards) || settings.cards,
    };

    dispatch('updateGameSettings', updatedSettings);
    modalRef.current?.close();
  };

  return (
    <Modal modalRef={modalRef} className="game-settings">
      <form ref={formRef} onSubmit={onSubmit}>
        <h1>Game settings</h1>
        <Input group label model={settings} name="lobbyName"  />
        <Input group label model={settings} name="lobbyLimit"
          type="number" min={1} max={maxPlayersAllowed}
          errorMessage={`Must be between 1 and ${maxPlayersAllowed}`}
        />
        <Input group label model={settings} name="cards"
          type="number" min={0} max={maxCardsAllowed} 
          errorMessage={`Must be between 0 and ${maxCardsAllowed}`}
        />
        <div className="button-container reverse">
          <input type="submit" value="Update settings" />
          <Button type="button" importance="tertiary" className="close"
            onClick={() => modalRef.current?.close()}
          >Close</Button>
        </div>
      </form>
    </Modal>
  );
}