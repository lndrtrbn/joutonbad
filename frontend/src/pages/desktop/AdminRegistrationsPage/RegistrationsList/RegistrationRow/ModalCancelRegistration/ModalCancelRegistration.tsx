import { useState } from "react";

import { Registration } from "../../../../../../utils/registration";
import InputText from "../../../../../../components/InputText/InputText";
import ModalCancelRegistrationStyle from "./ModalCancelRegistration.style";
import ModalConfirm from "../../../../../../components/ModalConfirm/ModalConfirm";

type Props = {
  registration: Registration;
  onClose: () => void;
  onConfirm: (reason: string) => Promise<unknown>;
};

export default function ModalCancelRegistration({
  registration,
  onClose,
  onConfirm,
}: Props) {
  const [reason, setReason] = useState("");

  return (
    <ModalConfirm
      disabled={!reason}
      onClose={onClose}
      onConfirm={async () => {
        await onConfirm(reason);
      }}
    >
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
        value={reason}
        onChange={setReason}
        placeholder="Raison de l'annulation"
        width={ModalCancelRegistrationStyle.inputText}
      />
    </ModalConfirm>
  );
}
