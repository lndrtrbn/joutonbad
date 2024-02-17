import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import MText from "../MText/MText";
import MIcon from "../MIcon/MIcon";
import MCardInfoStyle from "./MCardInfo.style";
import MContainer from "../MContainer/MContainer";

type Props = {
  children: ReactNode;
  icon?: IconProp;
  style?: string;
};

export default function MCardInfo({
  children,
  icon = faInfo,
  style,
}: Props) {
  return (
    <MContainer style={twMerge(MCardInfoStyle.base, style)}>
      <MIcon naked icon={icon} />
      <MText type="small" color="text-m-moonlight60">
        {children}
      </MText>
    </MContainer>
  );
}
