import { ReactNode } from "react";

import ModalStyle from "./Modal.style";
import useClickOutside from "../../hooks/useClickOutside";

export type ModalProps = {
  children: ReactNode;
  onClickOutside: () => void;
};

export default function Modal({
  children,
  onClickOutside,
}: ModalProps) {
  const ref = useClickOutside(onClickOutside);

  return (
    <div className={ModalStyle.base}>
      <div ref={ref} className={ModalStyle.modal}>
        {children}
      </div>
    </div>
  );
}
