import * as z from "zod";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import Alert from "../../../components/Alert/Alert";
import InputText from "../../../components/InputText/InputText";
import { APIError, APIErrorMessage } from "../../../utils/error";
import ButtonLoading from "../../../components/ButtonLoading/ButtonLoading";

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
  loading?: boolean;
};

export default function FormMember({
  onSubmit,
  error,
  loading = false,
}: Props) {
  const [errorMsg, setErrorMsg] = useState("");

  const {
    control,
    handleSubmit,
    formState: { isValid },
    reset,
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

  function submit(data: FormMemberInputs) {
    onSubmit(data);
    reset();
  }

  return (
    <>
      <form
        className="flex gap-6 flex-wrap"
        onSubmit={handleSubmit(submit)}
      >
        <Controller
          name="name"
          control={control}
          render={({ field: { value, onChange } }) => (
            <InputText
              value={value}
              onChange={onChange}
              placeholder="Prénom"
              width="flex-1"
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
              width="flex-1"
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
              width="w-full"
            />
          )}
        />
        <ButtonLoading
          disabled={!isValid || loading}
          loading={loading}
          style="w-full"
        >
          Ajouter
        </ButtonLoading>
      </form>

      {errorMsg && (
        <Alert
          type="error"
          onClose={() => setErrorMsg("")}
          style="mt-4"
        >
          {errorMsg}
        </Alert>
      )}
    </>
  );
}
