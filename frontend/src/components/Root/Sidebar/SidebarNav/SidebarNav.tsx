import {
  faQuestion,
  faGear,
  faFire,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";

import Link from "../../../Link/Link";
import SidebarNavStyle from "./SidebarNav.style";
import { isEditor } from "../../../../utils/user";
import { useAuthContext } from "../../../../contexts/auth.context";

export default function SidebarNav() {
  const {
    user: [user],
  } = useAuthContext();

  return (
    <div className={SidebarNavStyle.base}>
      <Link to="/" icon={faCalendarDays}>
        Calendrier
      </Link>
      <Link to="/recap" icon={faFire}>
        Mon récap
      </Link>
      {user && isEditor(user) && (
        <Link to="/profil" icon={faUser}>
          Mon profil
        </Link>
      )}
      <Link to="/faq" icon={faQuestion}>
        FAQ
      </Link>
      {user && isEditor(user) && (
        <Link to="/admin" icon={faGear}>
          Admin
        </Link>
      )}
    </div>
  );
}
