import { twMerge } from "tailwind-merge";
import { Controller } from "react-hook-form";

import useSignupForm, {
  SignupFormProps,
} from "../../../../hooks/useSignupForm";
import MFormSignupStyle from "./MFormSignup.style";
import MText from "../../../../components/mobile/MText/MText";
import MAlert from "../../../../components/mobile/MAlert/MAlert";
import MInputText from "../../../../components/mobile/MInputText/MInputText";
import MButtonLoader from "../../../../components/mobile/MButtonLoader/MButtonLoader";

export default function MFormSignup({
  onSubmit,
  error,
  loading = false,
  canReset = false,
  style,
}: SignupFormProps) {
  const [
    {
      control,
      handleSubmit,
      formState: { isValid },
    },
    globalError,
  ] = useSignupForm(canReset, error);

  return (
    <form
      className={twMerge(MFormSignupStyle.base, style)}
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

      <Controller
        name="passwordConfirm"
        control={control}
        render={({ field: { value, onChange } }) => (
          <MInputText
            type="password"
            value={value}
            onChange={onChange}
            placeholder="Confirmation mdp"
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
        Créer mon compte
      </MButtonLoader>
    </form>
  );
}
