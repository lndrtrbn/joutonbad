import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

import { Alert } from "../utils/alert";
import { ContextData, ProviderProps } from "./context.type";

type Context = ContextData<Alert[]>;

const AlertsContext = createContext<Context | undefined>(undefined);

export function AlertsProvider({ children }: ProviderProps) {
  const alertsState = useState<Alert[]>([]);

  return (
    <AlertsContext.Provider value={alertsState}>
      {children}
    </AlertsContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAlertsContext() {
  const context = useContext(AlertsContext);
  if (!context) {
    throw new Error(
      "useAlertsContext must be used within a AlertsProvider",
    );
  }

  const [alerts, setAlerts] = context;

  const removeAlert = useCallback(
    (alert: Alert) => {
      setAlerts((old) => old.filter((a) => a !== alert));
    },
    [setAlerts],
  );

  const addAlert = useCallback(
    (alert: Alert) => {
      setAlerts((old) => [...old, alert]);
      setTimeout(() => removeAlert(alert), 5000);
    },
    [setAlerts, removeAlert],
  );

  return { alerts, addAlert, removeAlert };
}
