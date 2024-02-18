import { createPortal } from "react-dom";
import { ReactNode, ReactPortal, useState } from "react";

type UseModal = [
  ReactPortal | undefined,
  (modal: ReactNode) => void,
  () => void,
];

/**
 * Create a portal at the root of the DOM to insert the modal component in it.
 *
 * Example:
 *
 * const [portal, open, close] = useModal();
 * function openModal() {
 *   open(
 *     <ModalConfirm
 *       onClose={close}
 *       onConfirm={() => {...}}
 *     >
 *       ...
 *     </ModalConfirm>
 *   );
 * }
 *
 * @returns The portal to add in JSX, functions to open and close modal.
 */
export default function useModal(): UseModal {
  const [portal, setPortal] = useState<ReactPortal>();

  function open(Modal: ReactNode) {
    setPortal(createPortal(Modal, document.body));
  }

  function close() {
    setPortal(undefined);
  }

  return [portal, open, close];
}
