import { Controller } from "react-hook-form";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useLoginForm, {
  LoginFormProps,
} from "../../../../hooks/useLoginForm";
import FormLoginStyle from "./FormLogin.style";
import Alert from "../../../../components/Alert/Alert";
import Button from "../../../../components/Button/Button";
import InputText from "../../../../components/InputText/InputText";

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
      className={FormLoginStyle.base}
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
      <Button disabled={!isValid || loading}>
        {loading ? (
          <span>
            <FontAwesomeIcon icon={faSpinner} spin />
          </span>
        ) : (
          <span>Me connecter</span>
        )}
      </Button>
    </form>
  );
}
