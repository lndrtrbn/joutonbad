import {
  faBomb,
  faCheck,
  faInfo,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import MIcon from "../MIcon/MIcon";
import MAlertStyle from "./MAlert.style";
import { Alert } from "../../../utils/alert";
import MContainer from "../MContainer/MContainer";

type Props = {
  type: Alert["type"];
  children: ReactNode;
  style?: string;
};

export default function MAlert({ type, children, style }: Props) {
  const icon = {
    info: faInfo,
    success: faCheck,
    warning: faTriangleExclamation,
    error: faBomb,
  }[type];

  return (
    <MContainer
      style={twMerge(MAlertStyle.base, MAlertStyle[type], style)}
    >
      <MIcon bg="bg-m-black20" icon={icon} />
      <div className={MAlertStyle.msg}>{children}</div>
    </MContainer>
  );
}
