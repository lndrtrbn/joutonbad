import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import MContainerStyle from "./MContainer.style";
import { BgColor } from "../../../styles/designSystem/colors";
import { BorderRadius } from "../../../styles/designSystem/radius";

type Props = {
  children: ReactNode;
  bg?: BgColor;
  border?: BorderRadius;
  style?: string;
  onClick?: () => void;
};

export default function MContainer({
  children,
  bg = "bg-m-moon10",
  border = "rounded-3xl",
  style,
  onClick,
}: Props) {
  return (
    <div
      onClick={onClick}
      className={twMerge(MContainerStyle.base, border, bg, style)}
    >
      {children}
    </div>
  );
}
