import Svg from "../Svg/Svg";
import Title from "../Title/Title";
import LogoVerticalStyle from "./LogoVertical.style";

export type LogoVerticalProps = {
  withTitle?: boolean;
};

export default function LogoVertical({ withTitle = false }: LogoVerticalProps) {
  return (
    <div className={LogoVerticalStyle.base}>
      <Svg name="logo" size={48} style={LogoVerticalStyle.logo} />

      {withTitle && (
        <>
          <Title size="2xl" style="mb-0 sm:mb-0">
            Joutonbad
          </Title>
          <p>Inscription tournois</p>
        </>
      )}
    </div>
  );
}
