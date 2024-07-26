import { Outlet, createBrowserRouter } from "react-router-dom";

import AuthGuard from "./auth.guard";
import EditorGuard from "./editor.guard";
import UnauthGuard from "./unauth.guard";
import Root from "../components/Root/Root";
import FaqPage from "../pages/FaqPage/FaqPage";
import HomePage from "../pages/HomePage/HomePage";
import RecapPage from "../pages/RecapPage/RecapPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignupPage from "../pages/SignupPage/SignupPage";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";
import ForgotPwdPage from "../pages/ForgotPwdPage/ForgotPwdPage";
import TournamentPage from "../pages/TournamentPage/TournamentPage";
import AdminGlobalPage from "../pages/AdminGlobalPage/AdminGlobalPage";
import AdminMembersPage from "../pages/AdminMembersPage/AdminMembersPage";
import AdminTournamentPage from "../pages/AdminTournamentPage/AdminTournamentPage";
import AdminTournamentsPage from "../pages/AdminTournamentsPage/AdminTournamentsPage";
import AdminRegistrationsPage from "../pages/AdminRegistrationsPage/AdminRegistrationsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    errorElement: <ErrorBoundary />,
    children: [
      // PUBLIC PAGES : NO AUTH REQUIRED
      {
        path: "/login",
        element: (
          <UnauthGuard>
            <LoginPage />
          </UnauthGuard>
        ),
      },
      {
        path: "/signup",
        element: (
          <UnauthGuard>
            <SignupPage />
          </UnauthGuard>
        ),
      },
      {
        path: "/forgotpwd",
        element: (
          <UnauthGuard>
            <ForgotPwdPage />
          </UnauthGuard>
        ),
      },
      // PRIVATE PAGES : AUTH REQUIRED
      {
        path: "/",
        element: (
          <AuthGuard>
            <Root />
          </AuthGuard>
        ),
        children: [
          {
            path: "",
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
