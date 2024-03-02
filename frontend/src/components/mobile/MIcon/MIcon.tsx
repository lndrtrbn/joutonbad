import { twMerge } from "tailwind-merge";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import MIconStyle from "./MIcon.style";
import {
  BgColor,
  TextColor,
} from "../../../styles/designSystem/colors";

export type MIconProps = {
  icon: IconProp;
  onClick?: () => void;
  bg?: BgColor;
  color?: TextColor;
  size?: string;
  naked?: boolean;
  disabled?: boolean;
  style?: string;
};

export default function MIcon({
  icon,
  onClick,
  bg = "bg-m-moon/10",
  color = "text-m-white",
  size = "text-2xl",
  naked = false,
  disabled = false,
  style,
}: MIconProps) {
  return (
    <i
      className={twMerge(
        MIconStyle.base,
        color,
        !naked && bg,
        naked && MIconStyle.naked,
        disabled && MIconStyle.disabled,
        style,
      )}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} className={size} />
    </i>
  );
}
