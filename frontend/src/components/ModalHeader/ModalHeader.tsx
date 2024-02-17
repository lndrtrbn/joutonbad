import { twMerge } from "tailwind-merge";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Title from "../Title/Title";
import ModalHeaderStyle from "./ModalHeader.style";

export type ModalHeaderProps = {
  children: string;
  onClose?: () => void;
};

export default function ModalHeader({
  children,
  onClose,
}: ModalHeaderProps) {
  return (
    <div className={twMerge(ModalHeaderStyle.base)}>
      <div className={ModalHeaderStyle.title}>
        <Title size="xl">{children}</Title>
      </div>
      {onClose && (
        <FontAwesomeIcon
          onClick={onClose}
          className={ModalHeaderStyle.close}
          icon={faXmark}
        />
      )}
    </div>
  );
}
