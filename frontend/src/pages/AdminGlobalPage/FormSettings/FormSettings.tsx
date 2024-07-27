import * as z from "zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Settings } from "../../../utils/settings";
import Alert from "../../../components/Alert/Alert";
import { APIErrorMessage } from "../../../utils/error";
import InputText from "../../../components/InputText/InputText";
import { useUpdateSettings } from "../../../http/useHttpSettings";
import ButtonLoading from "../../../components/ButtonLoading/ButtonLoading";

const schema = z.object({
  clubPart: z.number().min(0),
});

type Inputs = z.infer<typeof schema>;

type Props = {
  settings: Settings;
};

export default function FormSettings({ settings }: Props) {
  const [errorMsg, setErrorMsg] = useState("");
  const { mutateAsync, isPending, error } = useUpdateSettings();

  const {
    control,
    handleSubmit,
    formState: { isValid, isDirty },
    reset,
  } = useForm<Inputs>({
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

  function submit(inputs: Inputs) {
    mutateAsync(inputs, {
      onSuccess: (d) => reset({ clubPart: d.clubPart }),
    });
  }

  return (
    <>
      <form className="flex gap-6 flex-wrap" onSubmit={handleSubmit(submit)}>
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
          disabled={!isValid || !isDirty || isPending}
          loading={isPending}
          style="w-full"
        >
          Modifier
        </ButtonLoading>
      </form>

      {errorMsg && (
        <Alert type="error" onClose={() => setErrorMsg("")} style="mt-4">
          {errorMsg}
        </Alert>
      )}
    </>
  );
}
