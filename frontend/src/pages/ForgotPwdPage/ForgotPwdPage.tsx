import { useNavigate } from "react-router-dom";

import Link from "../../components/Link/Link";
import Title from "../../components/Title/Title";
import FormForgotPwd from "./FormForgotPwd/FormForgotPwd";
import AuthLayout from "../../components/AuthLayout/AuthLayout";

export default function ForgotPwdPage() {
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <Title size="3xl">Mot de passe oublié</Title>

      <FormForgotPwd
        onSuccess={() =>
          navigate("/login", { state: "from-forgotpwd" })
        }
      />

      <Link to="/login" inline>
        J'ai déjà un compte
      </Link>
    </AuthLayout>
  );
}
