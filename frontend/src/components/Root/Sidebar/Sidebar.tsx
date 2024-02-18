import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

import SidebarStyle from "./Sidebar.style";
import Button from "../../Button/Button";
import SidebarNav from "./SidebarNav/SidebarNav";
import SidebarHeader from "./SidebarHeader/SidebarHeader";
import SidebarFooter from "./SidebarFooter/SidebarFooter";
import useClickOutside from "../../../hooks/useClickOutside";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";

export default function Sidebar() {
  const { width } = useWindowDimensions();
  const [opened, setOpened] = useState(false);
  const ref = useClickOutside(() => setOpened(false));

  function toggle() {
    setOpened((o) => !o);
  }

  const closable = width < 1085;

  return (
    <>
      {closable && opened && <div className={SidebarStyle.bg}></div>}
      <div
        ref={ref}
        className={twMerge(
          SidebarStyle.base,
          SidebarStyle.layout,
          closable && SidebarStyle.tranform,
          closable && SidebarStyle.baseSm,
          opened && SidebarStyle.noTranform,
        )}
      >
        <SidebarHeader />
        <SidebarNav />
        <SidebarFooter />

        {closable && (
          <Button
            onClick={toggle}
            style={SidebarStyle.button}
            variant="icon"
          >
            <FontAwesomeIcon icon={opened ? faXmark : faBars} />
          </Button>
        )}
      </div>
    </>
  );
}
