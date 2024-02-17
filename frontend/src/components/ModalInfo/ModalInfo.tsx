import { ReactNode } from "react";

import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import ModalInfoStyle from "./ModalInfo.style";
import ModalHeader from "../ModalHeader/ModalHeader";

type Props = {
  title: string;
  children: ReactNode;
  onClose: () => void;
};

export default function ModalInfo({
  children,
  title,
  onClose,
}: Props) {
  return (
    <Modal onClickOutside={onClose}>
      <ModalHeader>{title}</ModalHeader>

      <div>{children}</div>

      <div className={ModalInfoStyle.actions}>
        <Button onClick={onClose}>Fermer</Button>
      </div>
    </Modal>
  );
}
