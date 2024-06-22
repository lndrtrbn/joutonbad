import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import Title from "../../../components/Title/Title";
import Separator from "../../../components/Separator/Separator";

export default function AdminPage() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname == "/admin") {
      navigate("/admin/inscriptions");
    }
  }, [location, navigate]);

  return (
    <>
      <div>
        <Title size="3xl">Administration des données</Title>
        <Title subtitle>
          Page de gestion des membres, tournois et suivi des
          inscriptions
        </Title>
      </div>

      <Separator />
      <Outlet />
    </>
  );
}
