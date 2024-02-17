import { useState } from "react";

import FormSignup from "./FormSignup/FormSignup";
import Link from "../../../components/Link/Link";
import useSignup from "../../../hooks/useSignup";
import SignupPageStyle from "./SignupPage.style";
import Alert from "../../../components/Alert/Alert";
import Title from "../../../components/Title/Title";
import Button from "../../../components/Button/Button";
import Version from "../../../components/Version/Version";
import useVerifyEmail from "../../../hooks/useVerifyEmail";
import { SignupFormInputs } from "../../../hooks/useSignupForm";
import LogoVertical from "../../../components/LogoVertical/LogoVertical";

export default function SignupPage() {
  const [signup, error, fetching, fetched] = useSignup();
  const verifyEmail = useVerifyEmail();

  const [email, setEmail] = useState<string>();

  function submit(data: SignupFormInputs) {
    setEmail(data.email);
    signup(data);
  }

  return (
    <div className={SignupPageStyle.base}>
      <LogoVertical />
      <Title size="3xl">Création de compte</Title>

      <div className={SignupPageStyle.container}>
        <FormSignup
          onSubmit={submit}
          error={error}
          loading={fetching}
          canReset={fetched}
        />
        {fetched && (
          <Alert type="success">
            <p>Ton compte a bien été créé.</p>
            <p>Un email t'a été envoyé pour le valider.</p>
            <p>
              Tu n'as rien reçu ?{" "}
              <Button
                variant="link"
                onClick={() => verifyEmail(email)}
              >
                Renvoyer le mail
              </Button>
              .
            </p>
          </Alert>
        )}
      </div>

      <Link to="/login">J'ai déjà un compte</Link>
      <div className={SignupPageStyle.botton} />

      <Version />
    </div>
  );
}
