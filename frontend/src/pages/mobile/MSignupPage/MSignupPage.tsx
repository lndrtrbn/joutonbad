import { useState } from "react";

import useSignup from "../../../hooks/useSignup";
import MSignupPageStyle from "./MSignupPage.style";
import MFormSignup from "./MFormSignup/MFormSignup";
import MLogo from "../../../components/mobile/MLogo/MLogo";
import useVerifyEmail from "../../../hooks/useVerifyEmail";
import MLink from "../../../components/mobile/MLink/MLink";
import MText from "../../../components/mobile/MText/MText";
import MAlert from "../../../components/mobile/MAlert/MAlert";
import { SignupFormInputs } from "../../../hooks/useSignupForm";
import MButton from "../../../components/mobile/MButton/MButton";

export default function MSignupPage() {
  const [signup, error, fetching, fetched] = useSignup();
  const verifyEmail = useVerifyEmail();

  const [email, setEmail] = useState<string>();

  function submit(data: SignupFormInputs) {
    setEmail(data.email);
    signup(data);
  }

  return (
    <div className={MSignupPageStyle.base}>
      <MLogo withText />

      <MFormSignup
        onSubmit={submit}
        error={error}
        loading={fetching}
        canReset={fetched}
      />

      {fetched && (
        <MAlert type="success">
          <MText type="small" color="text-m-black">
            Ton compte a bien été créé
          </MText>
          <MText type="small" color="text-m-black">
            Un email t'a été envoyé pour le valider
          </MText>
          <MText type="small" color="text-m-black">
            <MButton
              style="-ml-6"
              size="small"
              onClick={() => verifyEmail(email)}
            >
              Renvoyer le mail
            </MButton>
          </MText>
        </MAlert>
      )}

      <MLink to="/m/login">J'ai déjà un compte</MLink>
    </div>
  );
}
