import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Link from "../../../components/Link/Link";
import Title from "../../../components/Title/Title";
import useForgotPwd from "../../../hooks/useForgotPwd";
import FormForgotPwd from "./FormForgotPwd/FormForgotPwd";
import AuthLayout from "../../../components/AuthLayout/AuthLayout";

export default function ForgotPwdPage() {
  const [call, fetching, fetched] = useForgotPwd();
  const navigate = useNavigate();

  useEffect(() => {
    if (fetched) navigate("/login", { state: "from-forgotpwd" });
  }, [fetched, navigate]);

  return (
    <AuthLayout>
      <Title size="3xl">Mot de passe oublié</Title>

      <FormForgotPwd
        onSubmit={(inputs) => call(inputs.email)}
        loading={fetching}
        canReset={fetched}
      />

      <Link to="/login" inline>
        J'ai déjà un compte
      </Link>
    </AuthLayout>
  );
}
