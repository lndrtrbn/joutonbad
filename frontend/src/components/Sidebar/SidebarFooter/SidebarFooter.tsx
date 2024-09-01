import { useAuth0 } from "@auth0/auth0-react";

import Button from "../../Button/Button";
import useLogin from "../../../hooks/useLogin";
import SidebarFooterStyle from "./SidebarFooter.style";

export default function SidebarFooter() {
  const { user } = useAuth0();
  const { logout } = useLogin();

  return (
    <div className={SidebarFooterStyle.base}>
      <div className={SidebarFooterStyle.text}>
        <p>Licence {user?.joutonbadLicence}</p>
      </div>
      <Button variant="light" onClick={logout}>
        Déconnexion
      </Button>
    </div>
  );
}
