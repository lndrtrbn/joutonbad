import { Outlet } from "react-router-dom";

import { Auth0Provider } from "@auth0/auth0-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { CONFIG } from "./config";
import { AlertsProvider } from "./contexts/alerts.context";
import { ProfilProvider } from "./contexts/profil.context";
import AlertPortal from "./components/AlertPortal/AlertPortal";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AlertsProvider>
        <Auth0Provider
          domain={CONFIG.auth0.clientDomain}
          clientId={CONFIG.auth0.clientId}
          authorizationParams={{
            audience: CONFIG.auth0.audience,
            redirect_uri: window.location.origin,
          }}
        >
          <ProfilProvider>
            <AlertPortal />
            <Outlet />
          </ProfilProvider>
        </Auth0Provider>
      </AlertsProvider>
    </QueryClientProvider>
  );
}
