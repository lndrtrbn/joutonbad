import Button from "../../../Button/Button";
import SidebarFooterStyle from "./SidebarFooter.style";
import { useAuthContext } from "../../../../contexts/auth.context";

export default function SidebarFooter() {
  const {
    user: [user, setUser],
  } = useAuthContext();

  function logout() {
    setUser(undefined);
  }

  return (
    <div className={SidebarFooterStyle.base}>
      <div className={SidebarFooterStyle.text}>
        <p>Licence {user?.license}</p>
      </div>
      <Button variant="light" onClick={logout}>
        Déconnexion
      </Button>
    </div>
  );
}
