import {
  faQuestion,
  faGear,
  faFire,
  faUserGroup,
  faMedal,
  faAddressCard,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";

import Link from "../../../Link/Link";
import SidebarNavStyle from "./SidebarNav.style";
import { isEditor } from "../../../../utils/user";
import { useAuthContext } from "../../../../contexts/auth.context";

export default function SidebarNav() {
  const { user } = useAuthContext();

  return (
    <div className={SidebarNavStyle.base}>
      <Link to="/" icon={faCalendarDays}>
        Calendrier
      </Link>
      <Link to="/recap" icon={faFire}>
        Mon récap
      </Link>

      {user && isEditor(user) && (
        <>
          <div className="mx-4 my-2 border-b border-black/10" />

          <Link to="/admin/membres" icon={faUserGroup}>
            Membres
          </Link>
          <Link to="/admin/tournois" icon={faMedal}>
            Tournois
          </Link>
          <Link to="/admin/inscriptions" icon={faAddressCard}>
            Inscriptions
          </Link>
          <Link to="/admin/global" icon={faGear}>
            Global
          </Link>
        </>
      )}

      <div className="mx-4 my-2 border-b border-black/10" />

      <Link to="/faq" icon={faQuestion}>
        FAQ
      </Link>
    </div>
  );
}
