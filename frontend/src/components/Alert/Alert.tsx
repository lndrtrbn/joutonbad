import {
  faCheck,
  faClose,
  faInfo,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AlertStyle from "./Alert.style";
import { Alert as AlertType } from "../../utils/alert";

export type AlertProps = {
  type: AlertType["type"];
  children: ReactNode;
  onClose?: () => void;
  style?: string;
};

export default function Alert({ type, children, onClose, style = "" }: AlertProps) {
  const icon = {
    info: faInfo,
    success: faCheck,
    error: faTriangleExclamation,
  }[type];

  return (
    <div className={twMerge(AlertStyle.container, style)}>
      <div className={twMerge(AlertStyle.base, AlertStyle[type])}>
        <FontAwesomeIcon className={AlertStyle.icon} icon={icon} />

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
