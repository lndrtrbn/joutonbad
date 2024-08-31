import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { RouterProvider } from "react-router-dom";

import { router } from "./router/router";
import { useQueryPlayer } from "./http/useHttpPlayer";
import { useProfilContext } from "./contexts/profil.context";
import AlertPortal from "./components/AlertPortal/AlertPortal";

export default function App() {
  const { user } = useAuth0();
  const { setProfil } = useProfilContext();

  const { data: player } = useQueryPlayer(user?.joutonbadLicence);

  useEffect(() => {
    if (player) setProfil(player);
  }, [player, setProfil]);

  return (
    <>
      <AlertPortal />
      <RouterProvider router={router} />
    </>
  );
}
