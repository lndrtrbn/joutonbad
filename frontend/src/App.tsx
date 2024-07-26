import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import { router } from "./router/router";
import { useQueryPlayer } from "./http/useHttpPlayer";
import { useAuthContext } from "./contexts/auth.context";
import AlertPortal from "./components/AlertPortal/AlertPortal";

export default function App() {
  const { user, setProfil } = useAuthContext();

  const { data: player } = useQueryPlayer(user?.license);

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
