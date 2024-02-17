import useLogin from "../../../hooks/useLogin";
import MFormLogin from "./MFormLogin/MFormLogin";
import MLoginPageStyle from "./MLoginPage.style";
import MLogo from "../../../components/mobile/MLogo/MLogo";
import MLink from "../../../components/mobile/MLink/MLink";

export default function MLoginPage() {
  const [callLogin, error, fetching] = useLogin();

  return (
    <div className={MLoginPageStyle.base}>
      <MLogo withText />

      <MFormLogin
        onSubmit={callLogin}
        error={error}
        loading={fetching}
      />

      <div className={MLoginPageStyle.container}>
        <MLink to="/m/signup">Créer mon compte</MLink>
        <MLink to="/m/forgotpwd">Mot de passe oublié</MLink>
      </div>
    </div>
  );
}
