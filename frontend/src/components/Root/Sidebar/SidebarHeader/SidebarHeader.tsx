import Svg from "../../../Svg/Svg";
import SidebarHeaderStyle from "./SidebarHeader.style";

export default function SidebarHeader() {
  return (
    <div className={SidebarHeaderStyle.base}>
      <Svg name="logo" size={48} style={SidebarHeaderStyle.logo} />

      <div className={SidebarHeaderStyle.text}>
        <span className={SidebarHeaderStyle.title}>REC</span>
        <span className={SidebarHeaderStyle.subtitle}>
          Gestion tournois
        </span>
      </div>
    </div>
  );
}
