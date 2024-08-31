import {
  faQuestion,
  faGear,
  faFire,
  faUserGroup,
  faMedal,
  faAddressCard,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth0 } from "@auth0/auth0-react";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";

import Link from "../../../Link/Link";
import SidebarNavStyle from "./SidebarNav.style";
import { isEditor } from "../../../../utils/user";

export default function SidebarNav() {
  const { user } = useAuth0();

  return (
    <div className={SidebarNavStyle.base}>
      <Link to="/home" icon={faCalendarDays}>
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
          <Link to="/admin/settings" icon={faGear}>
            Paramètres
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
