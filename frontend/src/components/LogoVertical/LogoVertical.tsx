import Svg from "../Svg/Svg";
import Title from "../Title/Title";
import LogoVerticalStyle from "./LogoVertical.style";

export default function LogoVertical() {
  return (
    <div className={LogoVerticalStyle.base}>
      <Svg name="logo" size={48} style={LogoVerticalStyle.logo} />

      <Title size="2xl" style="mb-0 sm:mb-0">
        Joutonbad
      </Title>

      <p>Inscription tournois</p>
    </div>
  );
}
