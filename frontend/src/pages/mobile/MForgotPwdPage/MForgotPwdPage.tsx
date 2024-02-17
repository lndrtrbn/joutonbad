import useForgotPwd from "../../../hooks/useForgotPwd";
import MForgotPwdPageStyle from "./MForgotPwdPage.style";
import MLogo from "../../../components/mobile/MLogo/MLogo";
import MLink from "../../../components/mobile/MLink/MLink";
import MText from "../../../components/mobile/MText/MText";
import MFormForgotPwd from "./MFormForgotPwd/MFormForgotPwd";
import MAlert from "../../../components/mobile/MAlert/MAlert";

export default function MForgotPwdPage() {
  const [call, fetching, fetched] = useForgotPwd();

  return (
    <div className={MForgotPwdPageStyle.base}>
      <MLogo withText />

      <MFormForgotPwd
        onSubmit={(inputs) => call(inputs.email)}
        loading={fetching}
        canReset={fetched}
      />

      {fetched && (
        <MAlert type="success">
          <MText type="small" color="text-m-black">
            Un email a été envoyé à ton adresse
          </MText>
          <MText type="small" color="text-m-black">
            Tu y trouveras un lien pour changer ton mot de passe
          </MText>
        </MAlert>
      )}

      <MLink to="/m/login">J'ai déjà un compte</MLink>
    </div>
  );
}
