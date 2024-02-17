import FormLogin from "./FormLogin/FormLogin";
import useLogin from "../../../hooks/useLogin";
import LoginPageStyle from "./LoginPage.style";
import Link from "../../../components/Link/Link";
import Title from "../../../components/Title/Title";
import Version from "../../../components/Version/Version";
import LogoVertical from "../../../components/LogoVertical/LogoVertical";

export default function LoginPage() {
  const [callLogin, error, fetching] = useLogin();

  return (
    <div className={LoginPageStyle.base}>
      <LogoVertical />
      <Title size="3xl">Connexion</Title>

      <div className={LoginPageStyle.container}>
        <FormLogin
          onSubmit={callLogin}
          error={error}
          loading={fetching}
        />
      </div>

      <Link to="/signup">Créer mon compte</Link>
      <Link to="/forgotpwd">Mot de passe oublié</Link>
      <div className={LoginPageStyle.botton} />

      <Version />
    </div>
  );
}
