import { Controller } from "react-hook-form";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useSignupForm, {
  SignupFormProps,
} from "../../../../hooks/useSignupForm";
import FormSignupStyle from "./FormSignup.style";
import Alert from "../../../../components/Alert/Alert";
import Button from "../../../../components/Button/Button";
import InputText from "../../../../components/InputText/InputText";

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
      formState: { isValid },
    },
    globalError,
  ] = useSignupForm(canReset, error);

  return (
    <form
      className={FormSignupStyle.base}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="email"
        control={control}
        render={({ field: { value, onChange } }) => (
          <InputText
            value={value}
            onChange={onChange}
            placeholder="Email"
            width="sm:w-full"
          />
        )}
      />
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
      <Controller
        name="passwordConfirm"
        control={control}
        render={({ field: { value, onChange } }) => (
          <InputText
            type="password"
            value={value}
            onChange={onChange}
            placeholder="Confirmation mdp"
            width="sm:w-full"
          />
        )}
      />
      {globalError && <Alert type="error">{globalError}</Alert>}
      <Button disabled={!isValid || loading}>
        {loading ? (
          <FontAwesomeIcon icon={faSpinner} spin />
        ) : (
          <>Créer mon compte</>
        )}
      </Button>
    </form>
  );
}
