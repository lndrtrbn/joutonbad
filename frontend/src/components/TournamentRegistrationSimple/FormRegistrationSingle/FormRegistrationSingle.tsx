import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import InputTag from "../../InputTag/InputTag";
import { LEVELS, Level } from "../../../utils/level";
import ButtonLoading from "../../ButtonLoading/ButtonLoading";
import { Discipline, DISCIPLINES } from "../../../utils/discipline";
import FormRegistrationSingleStyle from "./FormRegistrationSingle.style";

const schema = z.object({
  discipline: z.enum(DISCIPLINES),
  rank: z.enum(LEVELS),
});

export type RegistrationSingleInputs = z.infer<typeof schema>;

type Props = {
  loading?: boolean;
  disciplines: Discipline[];
  onSubmit: (data: RegistrationSingleInputs) => void;
};

export default function FormRegistrationSingle({
  loading = false,
  disciplines,
  onSubmit,
}: Props) {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<RegistrationSingleInputs>({
    resolver: zodResolver(schema),
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
            list={disciplines}
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
      <ButtonLoading
        loading={loading}
        disabled={!isValid || loading}
        style="w-full sm:w-80"
      >
        Envoyer l'inscription
      </ButtonLoading>
    </form>
  );
}
