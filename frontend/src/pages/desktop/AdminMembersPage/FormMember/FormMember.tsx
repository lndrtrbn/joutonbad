import * as z from "zod";
import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import FormMemberStyle from "./FormMember.style";
import Alert from "../../../../components/Alert/Alert";
import Button from "../../../../components/Button/Button";
import InputText from "../../../../components/InputText/InputText";
import { APIError, APIErrorMessage } from "../../../../utils/error";

export type FormMemberInputs = {
  name: string;
  lastname: string;
  license: string;
  club: string;
};

const schema = z.object({
  name: z.string().min(1),
  lastname: z.string().min(1),
  license: z.string().min(1),
  club: z.string().min(1),
});

type Props = {
  onSubmit: (data: FormMemberInputs) => void;
  error?: APIError;
};

export default function FormMember({ onSubmit, error }: Props) {
  const [errorMsg, setErrorMsg] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormMemberInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      lastname: "",
      license: "",
      club: "REC",
    },
  });

  useEffect(() => {
    if (!error) {
      setErrorMsg("");
    } else if (error?.message === APIErrorMessage.CANNOT_CREATE) {
      setErrorMsg("Un.e membre existe déjà avec cette licence");
    } else {
      setErrorMsg("Erreur à la création");
    }
  }, [error]);

  return (
    <>
      <form
        className={FormMemberStyle.base}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="name"
          control={control}
          render={({ field: { value, onChange } }) => (
            <InputText
              value={value}
              onChange={onChange}
              placeholder="Prénom"
              inError={!!errors.name?.message}
              width={FormMemberStyle.inputText}
            />
          )}
        />
        <Controller
          name="lastname"
          control={control}
          render={({ field: { value, onChange } }) => (
            <InputText
              value={value}
              onChange={onChange}
              placeholder="Nom"
              inError={!!errors.lastname?.message}
              width={FormMemberStyle.inputText}
            />
          )}
        />
        <Controller
          name="license"
          control={control}
          render={({ field: { value, onChange } }) => (
            <InputText
              value={value}
              onChange={onChange}
              placeholder="Licence"
              inError={!!errors.license?.message}
              width={twMerge(FormMemberStyle.inputText, "sm:w-44")}
            />
          )}
        />
        <Button disabled={!isValid}>Ajouter</Button>
      </form>

      {error && (
        <div className={FormMemberStyle.error}>
          <Alert type="error">{errorMsg}</Alert>
        </div>
      )}
    </>
  );
}
