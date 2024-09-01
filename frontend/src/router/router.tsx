import { Outlet, createBrowserRouter } from "react-router-dom";

import App from "../App";
import Root from "./Root/Root";
import AuthGuard from "./auth.guard";
import EditorGuard from "./editor.guard";
import FaqPage from "../pages/FaqPage/FaqPage";
import HomePage from "../pages/HomePage/HomePage";
import RecapPage from "../pages/RecapPage/RecapPage";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";
import ConnectPage from "../pages/ConnectPage/ConnectPage";
import CallbackPage from "../pages/CallbackPage/CallbackPage";
import TournamentPage from "../pages/TournamentPage/TournamentPage";
import AdminGlobalPage from "../pages/AdminGlobalPage/AdminGlobalPage";
import AdminMembersPage from "../pages/AdminMembersPage/AdminMembersPage";
import NoPlayerFoundPage from "../pages/NoPlayerFoundPage/NoPlayerFoundPage";
import AdminTournamentPage from "../pages/AdminTournamentPage/AdminTournamentPage";
import AdminTournamentsPage from "../pages/AdminTournamentsPage/AdminTournamentsPage";
import AdminRegistrationsPage from "../pages/AdminRegistrationsPage/AdminRegistrationsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      // PUBLIC PAGES : NO AUTH REQUIRED
      {
        path: "",
        element: <ConnectPage />,
      },
      {
        path: "/callback",
        element: <CallbackPage />,
      },
      {
        path: "/notfound",
        element: <NoPlayerFoundPage />,
      },
      // PRIVATE PAGES : AUTH REQUIRED
      {
        path: "/",
        element: <AuthGuard component={Root} />,
        children: [
          {
            path: "/home",
            element: <HomePage />,
          },
          {
            path: "/faq",
            element: <FaqPage />,
          },
          {
            path: "/recap",
            element: <RecapPage />,
          },
          {
            path: "/tournoi/:id",
            element: <TournamentPage />,
          },
          // ADMIN PAGES : EDITOR ROLE REQUIRED
          {
            path: "/admin",
            element: (
              <EditorGuard>
                <Outlet />
              </EditorGuard>
            ),
            children: [
              {
                path: "membres",
                element: <AdminMembersPage />,
              },
              {
                path: "tournois",
                element: <AdminTournamentsPage />,
              },
              {
                path: "tournois/:id",
                element: <AdminTournamentPage />,
              },
              {
                path: "inscriptions",
                element: <AdminRegistrationsPage />,
              },
              {
                path: "settings",
                element: <AdminGlobalPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
