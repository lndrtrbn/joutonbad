import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

import ScreenLoader from "../../components/ScreenLoader/ScreenLoader";

export default function CallbackPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isAuthenticated) navigate("/home");
    }, 2000);
    return () => clearTimeout(timeout);
  }, [isAuthenticated, navigate]);

  return <ScreenLoader />;
}
