import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";

import Alert from "../Alert/Alert";
import MAlert from "../mobile/MAlert/MAlert";
import useDevice from "../../hooks/useDevice";
import AlertPortalStyle from "./AlertPortal.style";
import { useAlertsContext } from "../../contexts/alerts.context";

export default function AlertPortal() {
  const device = useDevice();
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
            <>
              {device === "desktop" ? (
                <Alert
                  key={i}
                  type={alert.type}
                  onClose={() => removeAlert(alert)}
                >
                  {alert.message}
                </Alert>
              ) : (
                <MAlert key={i} type={alert.type}>
                  {alert.message}
                </MAlert>
              )}
            </>
          ))}
        </div>,
        document.body,
      )}
    </>
  );
}
