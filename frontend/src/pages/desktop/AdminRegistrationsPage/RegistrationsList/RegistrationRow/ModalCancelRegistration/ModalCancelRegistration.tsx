import { useState } from "react";

import Modal from "../../../../../../components/Modal/Modal";
import Button from "../../../../../../components/Button/Button";
import { Registration } from "../../../../../../utils/registration";
import InputText from "../../../../../../components/InputText/InputText";
import ModalCancelRegistrationStyle from "./ModalCancelRegistration.style";
import ModalHeader from "../../../../../../components/ModalHeader/ModalHeader";

type Props = {
  registration: Registration;
  onClose: () => void;
  onConfirm: (reason: string) => void;
};

export default function ModalCancelRegistration({
  registration,
  onClose,
  onConfirm,
}: Props) {
  const [reason, setReason] = useState<string>();

  return (
    <Modal onClickOutside={onClose}>
      <ModalHeader>Annulation de l'inscription</ModalHeader>

      <div>
        <p className={ModalCancelRegistrationStyle.content}>
          Es-tu sûr.e de vouloir annuler l'inscription{" "}
          {registration.discipline} de
          <span className="font-medium">
            {" "}
            {registration.player.name} {registration.player.lastname}
          </span>{" "}
          ?
        </p>

        <InputText
          value={reason ?? ""}
          onChange={setReason}
          placeholder="Raison de l'annulation"
          width={ModalCancelRegistrationStyle.inputText}
        />
      </div>

      <div className={ModalCancelRegistrationStyle.actions}>
        <Button
          onClick={() => onConfirm(reason ?? "")}
          disabled={!reason}
        >
          Confirmer
        </Button>
        <Button onClick={onClose} variant="light">
          Fermer
        </Button>
      </div>
    </Modal>
  );
}
