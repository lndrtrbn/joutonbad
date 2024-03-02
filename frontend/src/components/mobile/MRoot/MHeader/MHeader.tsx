import {
  faArrowLeft,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { twMerge } from "tailwind-merge";
import { useLocation, useNavigate } from "react-router-dom";

import MText from "../../MText/MText";
import MIcon from "../../MIcon/MIcon";
import MLogo from "../../MLogo/MLogo";
import MHeaderStyle from "./MHeader.style";
import MContainer from "../../MContainer/MContainer";
import { useAuthContext } from "../../../../contexts/auth.context";

type Props = {
  onTop: boolean;
};

const mainRoutes = [
  "/m/",
  "/m/calendar",
  "/m/faq",
  "/m/admin",
  "/m/profil",
];

export default function MHeader({ onTop }: Props) {
  const {
    user: [user, setUser],
  } = useAuthContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  function logout() {
    setUser(undefined);
  }

  return (
    <div
      className={twMerge(
        MHeaderStyle.base,
        MHeaderStyle.layout,
        onTop && MHeaderStyle.top,
      )}
    >
      {mainRoutes.includes(pathname) ? (
        <MLogo />
      ) : (
        <MIcon onClick={goBack} icon={faArrowLeft} />
      )}
      <div className="flex-1" />
      <MContainer style="p-4 px-6 rounded-full">
        <MText color="text-m-moonlight/60" type="small">
          {user?.license}
        </MText>
      </MContainer>
      <MIcon onClick={logout} icon={faSignOut} />
    </div>
  );
}
