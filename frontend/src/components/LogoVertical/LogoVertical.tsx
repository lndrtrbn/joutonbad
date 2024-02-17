import Svg from "../Svg/Svg";
import LogoVerticalStyle from "./LogoVertical.style";

export default function LogoVertical() {
  return (
    <div className={LogoVerticalStyle.base}>
      <Svg name="logo" size={48} style={LogoVerticalStyle.logo} />

      <span className={LogoVerticalStyle.title}>REC</span>
      <span className={LogoVerticalStyle.subtitle}>
        Gestion tournois
      </span>
    </div>
  );
}
