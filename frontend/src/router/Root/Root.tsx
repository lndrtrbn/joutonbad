import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar/Sidebar";
import { useQueryMe } from "../../http/useHttpPlayer";
import { useProfilContext } from "../../contexts/profil.context";
import ScreenLoader from "../../components/ScreenLoader/ScreenLoader";

export default function Root() {
  const navigate = useNavigate();
  const { setProfil } = useProfilContext();

  const { data: player, error } = useQueryMe();

  useEffect(() => {
    if (player) setProfil(player);
  }, [player, setProfil]);

  useEffect(() => {
    if (error) navigate("/notfound");
  }, [error, navigate]);

  if (!player) {
    return <ScreenLoader />;
  }

  return (
    <div className="w-screen h-screen flex bg-white text-black overflow-hidden">
      <Sidebar />

      <div className="flex-1 overflow-y-auto py-14 px-8">
        <Outlet />
      </div>
    </div>
  );
}
