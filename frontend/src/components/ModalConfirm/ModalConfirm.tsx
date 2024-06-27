import { ReactNode, useState } from "react";

import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import ModalHeader from "../ModalHeader/ModalHeader";
import ModalConfirmStyle from "./ModalConfirm.style";
import ButtonLoading from "../ButtonLoading/ButtonLoading";

export type ModalConfirmProps = {
  children: ReactNode;
  onClose: () => void;
  onConfirm: () => Promise<unknown>;
};

export default function ModalConfirm({
  children,
  onClose,
  onConfirm,
}: ModalConfirmProps) {
  const [confirming, setConfirming] = useState(false);

  function close() {
    if (!confirming) {
      onClose();
    }
  }

  async function confirm() {
    if (!confirming) {
      setConfirming(true);
      await onConfirm();
      setConfirming(false);
    }
  }

  return (
    <Modal onClickOutside={close}>
      <ModalHeader>Confirmation de l'action</ModalHeader>

      <div>{children}</div>

      <div className={ModalConfirmStyle.actions}>
        <ButtonLoading
          loading={confirming}
          disabled={confirming}
          onClick={confirm}
          style="w-36"
        >
          Confirmer
        </ButtonLoading>
        <Button onClick={close} variant="light" disabled={confirming}>
          Annuler
        </Button>
      </div>
    </Modal>
  );
}
