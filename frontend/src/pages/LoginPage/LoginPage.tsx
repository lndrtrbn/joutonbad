import { useLocation } from "react-router-dom";

import FormLogin from "./FormLogin/FormLogin";
import Link from "../../components/Link/Link";
import Title from "../../components/Title/Title";
import Alert from "../../components/Alert/Alert";
import AuthLayout from "../../components/AuthLayout/AuthLayout";

export default function LoginPage() {
  const { state } = useLocation();

  return (
    <AuthLayout>
      <Title size="3xl">Connexion</Title>

      {state === "from-signup" && (
        <Alert type="success">
          <p>Ton compte a bien été créé.</p>
          <p>Un email t'a été envoyé pour le valider.</p>
        </Alert>
      )}
      {state === "from-forgotpwd" && (
        <Alert type="info">
          <p>
            Un email a été envoyé à ton adresse. Tu y trouveras un lien pour changer
            ton mot de passe.
          </p>
        </Alert>
      )}

      <FormLogin />

      <Link to="/signup" inline>
        Créer mon compte
      </Link>
      <Link to="/forgotpwd" inline>
        Mot de passe oublié
      </Link>
    </AuthLayout>
  );
}
