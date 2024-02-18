import {
  faBomb,
  faCheck,
  faClose,
  faInfo,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AlertStyle from "./Alert.style";
import { Alert } from "../../utils/alert";

export type AlertProps = {
  type: Alert["type"];
  children: ReactNode;
  onClose?: () => void;
};

export default function Alert({
  type,
  children,
  onClose,
}: AlertProps) {
  const icon = {
    info: faInfo,
    success: faCheck,
    warning: faTriangleExclamation,
    error: faBomb,
  }[type];

  return (
    <div className={AlertStyle.container}>
      <div className={twMerge(AlertStyle.base, AlertStyle[type])}>
        <FontAwesomeIcon
          className={twMerge(
            AlertStyle.icon,
            AlertStyle.iconType[type],
          )}
          icon={icon}
        />

        <div className={AlertStyle.msg}>{children}</div>

        {onClose && (
          <FontAwesomeIcon
            onClick={onClose}
            className={twMerge(AlertStyle.icon)}
            icon={faClose}
          />
        )}
      </div>
    </div>
  );
}
