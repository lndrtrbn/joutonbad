import { Outlet } from "react-router-dom";

import AuthGuard from "./auth.guard";
import EditorGuard from "./editor.guard";
import UnauthGuard from "./unauth.guard";
import Root from "../components/Root/Root";
import FaqPage from "../pages/desktop/FaqPage/FaqPage";
import HomePage from "../pages/desktop/HomePage/HomePage";
import RecapPage from "../pages/desktop/RecapPage/RecapPage";
import LoginPage from "../pages/desktop/LoginPage/LoginPage";
import SignupPage from "../pages/desktop/SignupPage/SignupPage";
import ProfilPage from "../pages/desktop/ProfilPage/ProfilPage";
import ForgotPwdPage from "../pages/desktop/ForgotPwdPage/ForgotPwdPage";
import TournamentPage from "../pages/desktop/TournamentPage/TournamentPage";
import AdminGlobalPage from "../pages/desktop/AdminGlobalPage/AdminGlobalPage";
import AdminMembersPage from "../pages/desktop/AdminMembersPage/AdminMembersPage";
import AdminTournamentPage from "../pages/desktop/AdminTournamentPage/AdminTournamentPage";
import AdminTournamentsPage from "../pages/desktop/AdminTournamentsPage/AdminTournamentsPage";
import AdminRegistrationsPage from "../pages/desktop/AdminRegistrationsPage/AdminRegistrationsPage";

export const DESKTOP_ROUTES = [
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
      {
        path: "profil",
        element: <ProfilPage />,
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
            path: "global",
            element: <AdminGlobalPage />,
          },
        ],
      },
    ],
  },
];
