import { Controller } from "react-hook-form";

import useForgotPwdForm, {
  FormForgotPwdProps,
} from "../../../../hooks/useForgotPwdForm";
import MFormForgotPwdStyle from "./MFormForgotPwd.style";
import MInputText from "../../../../components/mobile/MInputText/MInputText";
import MButtonLoader from "../../../../components/mobile/MButtonLoader/MButtonLoader";

export default function MFormForgotPwd({
  onSubmit,
  loading = false,
  canReset = false,
}: FormForgotPwdProps) {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForgotPwdForm(canReset);

  return (
    <form
      className={MFormForgotPwdStyle.base}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="email"
        control={control}
        render={({ field: { value, onChange } }) => (
          <MInputText
            value={value}
            onChange={onChange}
            placeholder="Email"
            type="email"
          />
        )}
      />

      <MButtonLoader disabled={!isValid} loading={loading}>
        Changer mon mot de passe
      </MButtonLoader>
    </form>
  );
}
