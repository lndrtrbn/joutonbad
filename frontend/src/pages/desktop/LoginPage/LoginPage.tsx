import FormLogin from "./FormLogin/FormLogin";
import useLogin from "../../../hooks/useLogin";
import LoginPageStyle from "./LoginPage.style";
import Link from "../../../components/Link/Link";
import Title from "../../../components/Title/Title";
import LogoVertical from "../../../components/LogoVertical/LogoVertical";

export default function LoginPage() {
  const [callLogin, error, fetching] = useLogin();

  return (
    <div className={LoginPageStyle.base}>
      <LogoVertical />

      <div className={LoginPageStyle.container}>
        <Title size="3xl">Connexion</Title>
        <FormLogin
          onSubmit={callLogin}
          error={error}
          loading={fetching}
        />
        <Link to="/signup" inline>
          Créer mon compte
        </Link>
        <Link to="/forgotpwd" inline>
          Mot de passe oublié
        </Link>
      </div>

      <div className={LoginPageStyle.botton}>
        <Title size="xl" style="mb-0 sm:mb-0">
          REC Badminton
        </Title>
      </div>
    </div>
  );
}
