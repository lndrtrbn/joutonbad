import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import FormSignup from "./FormSignup/FormSignup";
import Link from "../../components/Link/Link";
import useSignup from "../../hooks/useSignup";
import Title from "../../components/Title/Title";
import AuthLayout from "../../components/AuthLayout/AuthLayout";

export default function SignupPage() {
  const [signup, error, fetching, fetched] = useSignup();
  const navigate = useNavigate();

  useEffect(() => {
    if (fetched) navigate("/login", { state: "from-signup" });
  }, [fetched, navigate]);

  return (
    <AuthLayout>
      <Title size="3xl">Nouveau compte</Title>

      <FormSignup
        onSubmit={signup}
        error={error}
        loading={fetching}
        canReset={fetched}
      />

      <Link to="/login" inline>
        J'ai déjà un compte
      </Link>
    </AuthLayout>
  );
}
