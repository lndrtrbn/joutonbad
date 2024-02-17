import { Suspense } from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import { SvgProvider } from "./contexts/svg.context.tsx";
import { AuthProvider } from "./contexts/auth.context.tsx";
import { AlertsProvider } from "./contexts/alerts.context.tsx";
import ScreenLoader from "./components/ScreenLoader/ScreenLoader.tsx";

import "./styles/index.css";

ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
).render(
  <Suspense fallback={<ScreenLoader />}>
    <AuthProvider>
      <SvgProvider>
        <AlertsProvider>
          <App />
        </AlertsProvider>
      </SvgProvider>
    </AuthProvider>
  </Suspense>
);
