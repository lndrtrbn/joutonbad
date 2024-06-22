import { Controller } from "react-hook-form";

import useForgotPwdForm, {
  FormForgotPwdProps,
} from "../../../../hooks/useForgotPwdForm";
import InputText from "../../../../components/InputText/InputText";
import ButtonLoading from "../../../../components/ButtonLoading/ButtonLoading";

export default function FormForgotPwd({
  onSubmit,
  loading = false,
  canReset = false,
}: FormForgotPwdProps) {
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForgotPwdForm(canReset);

  return (
    <form
      className="flex flex-col gap-4 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
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
      <ButtonLoading disabled={!isValid || loading} loading={loading}>
        Changer de mot de passe
      </ButtonLoading>
    </form>
  );
}
