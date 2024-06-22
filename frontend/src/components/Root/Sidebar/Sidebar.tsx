import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Button from "../../Button/Button";
import SidebarStyle from "./Sidebar.style";
import SidebarNav from "./SidebarNav/SidebarNav";
import SidebarFooter from "./SidebarFooter/SidebarFooter";
import LogoVertical from "../../LogoVertical/LogoVertical";
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
        <LogoVertical />
        <SidebarNav />
        <SidebarFooter />

        {closable && !opened && (
          <Button
            onClick={toggle}
            style={SidebarStyle.button}
            variant="icon"
          >
            <FontAwesomeIcon icon={faBars} />
          </Button>
        )}
      </div>
    </>
  );
}
