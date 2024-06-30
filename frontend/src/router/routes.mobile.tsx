import { Outlet } from "react-router-dom";

import AuthGuard from "./auth.guard";
import EditorGuard from "./editor.guard";
import UnauthGuard from "./unauth.guard";
import AdminGlobalPage from "../pages/desktop/AdminGlobalPage/AdminGlobalPage";
import AdminMembersPage from "../pages/desktop/AdminMembersPage/AdminMembersPage";
import AdminTournamentsPage from "../pages/desktop/AdminTournamentsPage/AdminTournamentsPage";
import AdminRegistrationsPage from "../pages/desktop/AdminRegistrationsPage/AdminRegistrationsPage";
import HomePage from "../pages/mobile/HomePage/HomePage";
import RootMobile from "../components/mobile/MRoot/MRoot";
import FaqPage from "../pages/mobile/FaqPage/FaqPage";
import CalendarPage from "../pages/mobile/CalendarPage/CalendarPage";
import TournamentPage from "../pages/mobile/TournamentPage/TournamentPage";
import MLoginPage from "../pages/mobile/MLoginPage/MLoginPage";
import MSignupPage from "../pages/mobile/MSignupPage/MSignupPage";
import MForgotPwdPage from "../pages/mobile/MForgotPwdPage/MForgotPwdPage";
import MProfilPage from "../pages/mobile/MProfilPage/MProfilPage";
import AdminTournamentPage from "../pages/desktop/AdminTournamentPage/AdminTournamentPage";

export const MOBILE_ROUTES = [
  {
    path: "/m",
    children: [
      // PUBLIC PAGES : NO AUTH REQUIRED
      {
        path: "login",
        element: (
          <UnauthGuard>
            <MLoginPage />
          </UnauthGuard>
        ),
      },
      {
        path: "signup",
        element: (
          <UnauthGuard>
            <MSignupPage />
          </UnauthGuard>
        ),
      },
      {
        path: "forgotpwd",
        element: (
          <UnauthGuard>
            <MForgotPwdPage />
          </UnauthGuard>
        ),
      },
      // PRIVATE PAGES : AUTH REQUIRED
      {
        path: "",
        element: (
          <AuthGuard>
            <RootMobile />
          </AuthGuard>
        ),
        children: [
          {
            path: "",
            element: <HomePage />,
          },
          {
            path: "faq",
            element: <FaqPage />,
          },
          {
            path: "calendar",
            element: <CalendarPage />,
          },
          {
            path: "calendar/:id",
            element: <TournamentPage />,
          },
          {
            path: "profil",
            element: <MProfilPage />,
          },
          // ADMIN PAGES : EDITOR ROLE REQUIRED
          {
            path: "admin",
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
    ],
  },
];
