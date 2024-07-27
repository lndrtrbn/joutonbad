import { useNavigate } from "react-router-dom";

import Link from "../../components/Link/Link";
import FormSignup from "./FormSignup/FormSignup";
import Title from "../../components/Title/Title";
import AuthLayout from "../../components/AuthLayout/AuthLayout";

export default function SignupPage() {
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <Title size="3xl">Nouveau compte</Title>

      <FormSignup onSuccess={() => navigate("/login", { state: "from-signup" })} />

      <Link to="/login" inline>
        J'ai déjà un compte
      </Link>
    </AuthLayout>
  );
}
