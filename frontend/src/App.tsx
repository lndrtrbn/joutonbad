import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import { router } from "./router/router";
import useLazyFetch from "./http/useLazyFetch";
import useHttpPlayer from "./http/useHttpPlayer";
import { useAuthContext } from "./contexts/auth.context";
import AlertPortal from "./components/AlertPortal/AlertPortal";

export default function App() {
  const {
    user: [user],
    profil: [, setProfil],
  } = useAuthContext();

  const { getPlayer } = useHttpPlayer();
  const [fetchPlayer, player] = useLazyFetch(getPlayer);

  useEffect(() => {
    if (user && !player) fetchPlayer(user.license);
  }, [user, fetchPlayer, player]);

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
