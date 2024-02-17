import { Controller } from "react-hook-form";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useForgotPwdForm, {
  FormForgotPwdProps,
} from "../../../../hooks/useForgotPwdForm";
import FormForgotPwdStyle from "./FormForgotPwd.style";
import Button from "../../../../components/Button/Button";
import InputText from "../../../../components/InputText/InputText";

export default function FormForgotPwd({
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
      className={FormForgotPwdStyle.base}
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
      <Button disabled={!isValid || loading}>
        {loading ? (
          <FontAwesomeIcon icon={faSpinner} spin />
        ) : (
          <>Changer mon mot de passe</>
        )}
      </Button>
    </form>
  );
}
