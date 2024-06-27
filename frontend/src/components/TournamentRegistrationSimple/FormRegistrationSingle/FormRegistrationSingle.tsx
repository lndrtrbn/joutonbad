import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import {
  RegistrationSingleInputs,
  RegistrationSingleSchema,
} from "../../../utils/registration";
import Button from "../../Button/Button";
import InputTag from "../../InputTag/InputTag";
import { LEVELS, Level } from "../../../utils/level";
import { Discipline } from "../../../utils/discipline";
import FormRegistrationSingleStyle from "./FormRegistrationSingle.style";

type Props = {
  onSubmit: (data: RegistrationSingleInputs) => void;
};

export default function FormRegistrationSingle({ onSubmit }: Props) {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<RegistrationSingleInputs>({
    resolver: zodResolver(RegistrationSingleSchema),
  });

  return (
    <form
      className={FormRegistrationSingleStyle.base}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="discipline"
        control={control}
        render={({ field: { value, onChange } }) => (
          <InputTag
            value={value ? [value] : []}
            onChange={(val) => onChange(val[0] as Discipline)}
            list={[Discipline.SH, Discipline.SD]}
            label="Tableau"
            unique
          />
        )}
      />
      <Controller
        name="rank"
        control={control}
        render={({ field: { value, onChange } }) => (
          <InputTag
            value={value ? [value] : []}
            onChange={(val) => onChange(val[0] as Level)}
            list={LEVELS}
            label="Classement"
            unique
          />
        )}
      />
      <Button disabled={!isValid} style="w-full sm:w-80">
        Envoyer l'inscription
      </Button>
    </form>
  );
}
