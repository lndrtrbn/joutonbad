import * as z from "zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Settings } from "../../../utils/settings";
import Alert from "../../../components/Alert/Alert";
import InputText from "../../../components/InputText/InputText";
import { APIError, APIErrorMessage } from "../../../utils/error";
import ButtonLoading from "../../../components/ButtonLoading/ButtonLoading";

export type FormSettingsInputs = {
  clubPart: number;
};

const schema = z.object({
  clubPart: z.number().min(0),
});

type Props = {
  onSubmit: (data: FormSettingsInputs) => Promise<void>;
  settings: Settings;
  error?: APIError;
  loading?: boolean;
};

export default function FormSettings({
  onSubmit,
  settings,
  error,
  loading = false,
}: Props) {
  const [errorMsg, setErrorMsg] = useState("");

  const {
    control,
    handleSubmit,
    formState: { isValid, isDirty },
    reset,
  } = useForm<FormSettingsInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      clubPart: settings.clubPart,
    },
  });

  useEffect(() => {
    if (error) {
      reset();
    }
    if (!error) {
      setErrorMsg("");
    } else if (error?.message === APIErrorMessage.INVALID_PAYLOAD) {
      setErrorMsg("Certains champs ne sont pas valides");
    } else {
      setErrorMsg("Erreur lors de la mise à jour");
    }
  }, [error, reset]);

  return (
    <>
      <form
        className="flex gap-6 flex-wrap"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="clubPart"
          control={control}
          render={({ field: { value, onChange } }) => (
            <InputText
              value={value.toString()}
              onChange={(val) => onChange(parseInt(val || "0"))}
              label="Part remboursée par le club"
              width="flex-1"
              type="number"
            />
          )}
        />
        <ButtonLoading
          disabled={!isValid || !isDirty || loading}
          loading={loading}
          style="w-full"
        >
          Modifier
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
