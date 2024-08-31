import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App.tsx";
import { CONFIG } from "./config.ts";
import { SvgProvider } from "./contexts/svg.context.tsx";
import { ProfilProvider } from "./contexts/profil.context.tsx";
import { AlertsProvider } from "./contexts/alerts.context.tsx";
import ScreenLoader from "./components/ScreenLoader/ScreenLoader.tsx";

import "./styles/index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Suspense fallback={<ScreenLoader />}>
    <QueryClientProvider client={queryClient}>
      <Auth0Provider
        domain={CONFIG.auth0.clientDomain}
        clientId={CONFIG.auth0.clientId}
        authorizationParams={{
          audience: CONFIG.auth0.audience,
          redirect_uri: window.location.origin,
        }}
      >
        <ProfilProvider>
          <SvgProvider>
            <AlertsProvider>
              <App />
            </AlertsProvider>
          </SvgProvider>
        </ProfilProvider>
      </Auth0Provider>
    </QueryClientProvider>
  </Suspense>,
);
