import Svg from "../../Svg/Svg";
import MText from "../MText/MText";
import MLogoStyle from "./MLogo.style";

type Props = {
  withText?: boolean;
};

export default function MLogo({ withText = false }: Props) {
  return (
    <div className={MLogoStyle.base}>
      <Svg
        name="logo"
        size={!withText ? 40 : 80}
        style={MLogoStyle.logo}
      />
      {withText && <MText type="accent">Joutonbad</MText>}
    </div>
  );
}
