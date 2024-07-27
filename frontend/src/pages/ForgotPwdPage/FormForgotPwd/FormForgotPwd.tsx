import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { useForgotPwd } from "../../../http/useHttpAuth";
import InputText from "../../../components/InputText/InputText";
import ButtonLoading from "../../../components/ButtonLoading/ButtonLoading";

const schema = z.object({
  email: z.string().email("L'adresse mail est incorrecte"),
});

type Inputs = z.infer<typeof schema>;

type Props = {
  onSuccess: () => void;
};

export default function FormForgotPwd({ onSuccess }: Props) {
  const { mutateAsync, isPending } = useForgotPwd();

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
    mode: "onTouched",
  });

  function submit(data: Inputs) {
    mutateAsync(data.email, {
      onSuccess,
    });
  }

  return (
    <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit(submit)}>
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
      <ButtonLoading disabled={!isValid || isPending} loading={isPending}>
        Changer de mot de passe
      </ButtonLoading>
    </form>
  );
}
