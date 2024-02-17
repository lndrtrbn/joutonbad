import { useEffect } from "react";
import { twMerge } from "tailwind-merge";

import { VERSION } from "../../version";
import VersionStyle from "./Version.style";
import useModal from "../../hooks/useModal";
import ModalChangelog from "./ModalChangelog/ModalChangelog";
import { getLocalItem, setLocalItem } from "../../utils/localStorage";

export default function Version() {
  const [portal, open, close] = useModal();

  function showChangelog() {
    open(<ModalChangelog onClose={close} />);
  }

  // Keeping track of last version opened.
  useEffect(() => {
    const lastVersion = getLocalItem<string>("lastVersion");
    if (lastVersion !== VERSION) {
      setLocalItem("lastVersion", VERSION);
    }
  }, []);

  return (
    <>
      <div
        onClick={showChangelog}
        className={twMerge(VersionStyle.base, VersionStyle.border)}
      >
        {VERSION}
      </div>
      {portal}
    </>
  );
}
