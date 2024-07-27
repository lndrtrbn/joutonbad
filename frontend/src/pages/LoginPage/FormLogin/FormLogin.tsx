import * as z from "zod";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { kcUserToUser } from "../../../utils/user";
import Alert from "../../../components/Alert/Alert";
import { useSignin } from "../../../http/useHttpAuth";
import { APIErrorMessage } from "../../../utils/error";
import InputText from "../../../components/InputText/InputText";
import { useAuthContext } from "../../../contexts/auth.context";
import ButtonLoading from "../../../components/ButtonLoading/ButtonLoading";

const schema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

type Inputs = z.infer<typeof schema>;

export default function FormLogin() {
  const { setUser } = useAuthContext();
  const [errorMsg, setErrorMsg] = useState("");
  const { mutateAsync, isPending, error } = useSignin();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    if (!error) {
      setErrorMsg("");
    } else if (error?.message === APIErrorMessage.UNAUTHORIZED) {
      setErrorMsg("Les informations de connexion sont invalides");
    } else {
      setErrorMsg("Erreur de connexion");
    }
  }, [error]);

  function submit(inputs: Inputs) {
    mutateAsync(inputs, {
      onSuccess: (data) => {
        const userData = kcUserToUser(data);
        setUser(userData);
      },
    });
  }

  return (
    <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit(submit)}>
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

      {errorMsg && <Alert type="error">{errorMsg}</Alert>}

      <ButtonLoading disabled={!isValid || isPending} loading={isPending}>
        Me connecter
      </ButtonLoading>
    </form>
  );
}
