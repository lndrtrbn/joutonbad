import { Outlet, createBrowserRouter } from "react-router-dom";

import MobileGuard from "./mobile.guard";
import { DESKTOP_ROUTES } from "./routes";
import { MOBILE_ROUTES } from "./routes.mobile";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <MobileGuard>
        <Outlet />
      </MobileGuard>
    ),
    children: [...DESKTOP_ROUTES, ...MOBILE_ROUTES],
    errorElement: <ErrorBoundary />,
  },
]);
