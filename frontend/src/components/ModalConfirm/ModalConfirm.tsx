import { ReactNode } from "react";

import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import ModalHeader from "../ModalHeader/ModalHeader";
import ModalConfirmStyle from "./ModalConfirm.style";

export type ModalConfirmProps = {
  children: ReactNode;
  onClose: () => void;
  onConfirm: () => void;
};

export default function ModalConfirm({
  children,
  onClose,
  onConfirm,
}: ModalConfirmProps) {
  return (
    <Modal onClickOutside={onClose}>
      <ModalHeader>Confirmation de l'action</ModalHeader>

      <div>{children}</div>

      <div className={ModalConfirmStyle.actions}>
        <Button onClick={onConfirm}>Confirmer</Button>
        <Button onClick={onClose} variant="light">
          Annuler
        </Button>
      </div>
    </Modal>
  );
}
