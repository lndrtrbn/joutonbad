import * as z from "zod";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import Alert from "../../../components/Alert/Alert";
import { useSignup } from "../../../http/useHttpAuth";
import { APIErrorMessage } from "../../../utils/error";
import InputText from "../../../components/InputText/InputText";
import ButtonLoading from "../../../components/ButtonLoading/ButtonLoading";

const schema = z
  .object({
    username: z.string().min(1),
    password: z.string().min(1),
    passwordConfirm: z.string().min(1),
    email: z.string().email("L'adresse mail est incorrecte"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Les mots de passe ne sont pas identiques",
    path: ["passwordConfirm"],
  });

type Inputs = z.infer<typeof schema>;

type Props = {
  onSuccess: () => void;
};

export default function FormSignup({ onSuccess }: Props) {
  const [errorMsg, setErrorMsg] = useState("");
  const { mutateAsync, isPending, error } = useSignup();

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: "",
      passwordConfirm: "",
      email: "",
    },
    mode: "onTouched",
  });

  useEffect(() => {
    if (!error) {
      setErrorMsg("");
    } else if (error?.message === APIErrorMessage.ALREADY_EXISTING_USER) {
      setErrorMsg("Un compte existe déjà pour cette licence ou cet email");
    } else if (error?.message === APIErrorMessage.NO_PLAYER_FOUND) {
      setErrorMsg("Aucun profil trouvé avec cette licence");
    } else if (error?.message === APIErrorMessage.PLAYER_ALREADY_LINKED) {
      setErrorMsg("Le profil lié à cette licence est déjà actif");
    } else {
      setErrorMsg("Erreur à la création de compte");
    }
  }, [error]);

  function submit(data: Inputs) {
    mutateAsync(data, {
      onSuccess,
    });
  }

  return (
    <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit(submit)}>
      {errorMsg && (
        <Alert type="error" onClose={() => setErrorMsg("")}>
          {errorMsg}
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

      <ButtonLoading disabled={!isValid || isPending} loading={isPending}>
        Créer mon compte
      </ButtonLoading>
    </form>
  );
}
