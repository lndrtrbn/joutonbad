import { twMerge } from "tailwind-merge";
import { Controller } from "react-hook-form";

import useLoginForm, {
  LoginFormProps,
} from "../../../../hooks/useLoginForm";
import MFormLoginStyle from "./MFormLogin.style";
import MText from "../../../../components/mobile/MText/MText";
import MAlert from "../../../../components/mobile/MAlert/MAlert";
import MInputText from "../../../../components/mobile/MInputText/MInputText";
import MButtonLoader from "../../../../components/mobile/MButtonLoader/MButtonLoader";

export default function MFormLogin({
  onSubmit,
  error,
  loading = false,
  style,
}: LoginFormProps) {
  const [
    {
      control,
      handleSubmit,
      formState: { isValid },
    },
    globalError,
  ] = useLoginForm(error);

  return (
    <form
      className={twMerge(MFormLoginStyle.base, style)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="username"
        control={control}
        render={({ field: { value, onChange } }) => (
          <MInputText
            value={value}
            onChange={onChange}
            placeholder="Licence"
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field: { value, onChange } }) => (
          <MInputText
            type="password"
            value={value}
            onChange={onChange}
            placeholder="Mot de passe"
          />
        )}
      />

      {globalError && (
        <MAlert type="error">
          <MText type="small" color="text-m-white">
            {globalError}
          </MText>
        </MAlert>
      )}

      <MButtonLoader disabled={!isValid} loading={loading}>
        Me connecter
      </MButtonLoader>
    </form>
  );
}
