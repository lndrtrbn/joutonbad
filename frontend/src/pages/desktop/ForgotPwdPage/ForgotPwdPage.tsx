import Link from "../../../components/Link/Link";
import Alert from "../../../components/Alert/Alert";
import Title from "../../../components/Title/Title";
import useForgotPwd from "../../../hooks/useForgotPwd";
import ForgotPwdPageStyle from "./ForgotPwdPage.style";
import FormForgotPwd from "./FormForgotPwd/FormForgotPwd";
import LogoVertical from "../../../components/LogoVertical/LogoVertical";

export default function ForgotPwdPage() {
  const [call, fetching, fetched] = useForgotPwd();

  return (
    <div className={ForgotPwdPageStyle.base}>
      <LogoVertical />
      <Title size="3xl">Mot de passe oublié</Title>

      <div className={ForgotPwdPageStyle.container}>
        <FormForgotPwd
          onSubmit={(inputs) => call(inputs.email)}
          loading={fetching}
          canReset={fetched}
        />
        {fetched && (
          <Alert type="success">
            <p>Un email a été envoyé à ton adresse.</p>
            <p>
              Tu y trouveras un lien pour changer ton mot de passe.
            </p>
          </Alert>
        )}
      </div>

      <Link to="/login">J'ai déjà un compte</Link>
      <div className={ForgotPwdPageStyle.botton} />
    </div>
  );
}
