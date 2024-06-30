import { Controller } from "react-hook-form";

import useSignupForm, {
  SignupFormProps,
} from "../../../../hooks/useSignupForm";
import Alert from "../../../../components/Alert/Alert";
import InputText from "../../../../components/InputText/InputText";
import ButtonLoading from "../../../../components/ButtonLoading/ButtonLoading";

export default function FormSignup({
  onSubmit,
  error,
  loading = false,
  canReset = false,
}: SignupFormProps) {
  const [
    {
      control,
      handleSubmit,
      formState: { isValid, errors },
    },
    globalError,
    clearGlobalError,
  ] = useSignupForm(canReset, error);

  return (
    <form
      className="flex flex-col gap-4 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      {globalError && (
        <Alert type="error" onClose={clearGlobalError}>
          {globalError}
        </Alert>
      )}

      <Controller
        name="email"
        control={control}
        render={({ field: { value, onChange, onBlur } }) => (
          <InputText
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder="Email"
            width="sm:w-full"
            inError={!!errors.email}
            error={errors.email?.message}
          />
        )}
      />
      <Controller
        name="username"
        control={control}
        render={({ field: { value, onChange, onBlur } }) => (
          <InputText
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder="Licence"
            width="sm:w-full"
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field: { value, onChange, onBlur } }) => (
          <InputText
            type="password"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder="Mot de passe"
            width="sm:w-full"
          />
        )}
      />
      <Controller
        name="passwordConfirm"
        control={control}
        render={({ field: { value, onChange, onBlur } }) => (
          <InputText
            type="password"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder="Confirmation mdp"
            width="sm:w-full"
            inError={!!errors.passwordConfirm}
            error={errors.passwordConfirm?.message}
          />
        )}
      />
      <ButtonLoading disabled={!isValid || loading} loading={loading}>
        Créer mon compte
      </ButtonLoading>
    </form>
  );
}
