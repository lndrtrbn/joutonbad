import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";

import Alert from "../Alert/Alert";
import AlertPortalStyle from "./AlertPortal.style";
import { useAlertsContext } from "../../contexts/alerts.context";

export default function AlertPortal() {
  const { alerts, removeAlert } = useAlertsContext();

  return (
    <>
      {createPortal(
        <div
          className={twMerge(
            AlertPortalStyle.base,
            AlertPortalStyle.position,
          )}
        >
          {alerts.map((alert, i) => (
            <Alert
              key={i}
              type={alert.type}
              onClose={() => removeAlert(alert)}
            >
              {alert.message}
            </Alert>
          ))}
        </div>,
        document.body,
      )}
    </>
  );
}
