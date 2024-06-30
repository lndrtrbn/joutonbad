import { Controller } from "react-hook-form";

import useLoginForm, {
  LoginFormProps,
} from "../../../../hooks/useLoginForm";
import Alert from "../../../../components/Alert/Alert";
import InputText from "../../../../components/InputText/InputText";
import ButtonLoading from "../../../../components/ButtonLoading/ButtonLoading";

export default function FormLogin({
  onSubmit,
  error,
  loading = false,
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
      className="flex flex-col gap-4 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="username"
        control={control}
        render={({ field: { value, onChange } }) => (
          <InputText
            value={value}
            onChange={onChange}
            placeholder="Licence"
            width="sm:w-full"
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field: { value, onChange } }) => (
          <InputText
            type="password"
            value={value}
            onChange={onChange}
            placeholder="Mot de passe"
            width="sm:w-full"
          />
        )}
      />
      {globalError && <Alert type="error">{globalError}</Alert>}
      <ButtonLoading disabled={!isValid || loading} loading={loading}>
        Me connecter
      </ButtonLoading>
    </form>
  );
}
