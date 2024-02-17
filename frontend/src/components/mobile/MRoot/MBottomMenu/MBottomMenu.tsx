import {
  faCircleQuestion,
  faGear,
  faHouse,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { twMerge } from "tailwind-merge";
import { useLocation } from "react-router-dom";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";

import Link from "../../../Link/Link";
import MIcon from "../../MIcon/MIcon";
import { isEditor } from "../../../../utils/user";
import MBottomMenuStyle from "./MBottomMenu.style";
import { useAuthContext } from "../../../../contexts/auth.context";

export default function MBottomMenu() {
  const { pathname } = useLocation();
  const {
    user: [user],
  } = useAuthContext();

  return (
    <div
      className={twMerge(
        MBottomMenuStyle.base,
        MBottomMenuStyle.layout
      )}
    >
      {user && isEditor(user) && (
        <Link to="profil">
          <MIcon
            color={
              pathname.startsWith("/m/profil")
                ? "text-m-main"
                : "text-m-white"
            }
            icon={faUser}
            naked
          />
        </Link>
      )}
      <Link to="calendar">
        <MIcon
          color={
            pathname.startsWith("/m/calendar")
              ? "text-m-main"
              : "text-m-white"
          }
          icon={faCalendarDays}
          naked
        />
      </Link>
      <Link to="/m/">
        <MIcon
          color={pathname === "/m/" ? "text-m-main" : "text-m-white"}
          icon={faHouse}
          naked
        />
      </Link>
      {user && isEditor(user) && (
        <Link to="admin">
          <MIcon
            color={
              pathname === "/m/admin" ? "text-m-main" : "text-m-white"
            }
            icon={faGear}
            naked
          />
        </Link>
      )}
      <Link to="faq">
        <MIcon
          color={
            pathname === "/m/faq" ? "text-m-main" : "text-m-white"
          }
          icon={faCircleQuestion}
          naked
        />
      </Link>
    </div>
  );
}
