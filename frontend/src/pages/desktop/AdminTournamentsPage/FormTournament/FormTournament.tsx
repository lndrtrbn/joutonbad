import * as z from "zod";
import { format, parse } from "date-fns";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import {
  DISCIPLINES,
  Discipline,
} from "../../../../utils/discipline";
import { Player } from "../../../../utils/player";
import { APIError } from "../../../../utils/error";
import Alert from "../../../../components/Alert/Alert";
import { LEVELS, Level } from "../../../../utils/level";
import FormTournamentStyle from "./FormTournament.style";
import Button from "../../../../components/Button/Button";
import InputTag from "../../../../components/InputTag/InputTag";
import { Link, Tournament } from "../../../../utils/tournament";
import InputText from "../../../../components/InputText/InputText";
import InputArray from "../../../../components/InputArray/InputArray";
import InputLabels from "../../../../components/InputLabels/InputLabels";
import { TournamentPayload } from "../../../../http/useHttpTournament";
import InputSelectMembers from "../../../../components/InputSelectMembers/InputSelectMembers";
import InputCheckbox from "../../../../components/InputCheckbox/InputCheckbox";

export type FormTournamentInputs = {
  inChargeId: string;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  minLevel: Level;
  maxLevel: Level;
  disciplines: Discipline[];
  prices: string[];
  links: Link[];
  freezed?: boolean;
};

const schema = z.object({
  inChargeId: z.string().min(1),
  name: z.string().min(1),
  location: z.string().min(1),
  startDate: z.string().regex(/\d\d\/\d\d\/\d\d\d\d/),
  endDate: z.string().regex(/\d\d\/\d\d\/\d\d\d\d/),
  minLevel: z.string().min(1),
  maxLevel: z.string().min(1),
  disciplines: z.array(z.string()).min(1),
  prices: z.array(z.string().min(1)).min(1),
  links: z.array(
    z.object({
      name: z.string().min(1),
      url: z.string().min(1),
    })
  ),
  freezed: z.boolean(),
});

type Props = {
  players: Player[];
  onSubmit: (data: TournamentPayload) => void;
  error?: APIError;
  tournament?: Tournament;
};

function shortDate(date?: string): string {
  if (!date) return "";
  return format(new Date(date), "dd/MM/yyyy");
}

function defaultValues(t?: Tournament) {
  return {
    inChargeId: t?.inCharge.id ?? "",
    name: t?.name ?? "",
    location: t?.location ?? "",
    startDate: shortDate(t?.startDate) ?? "",
    endDate: shortDate(t?.endDate) ?? "",
    minLevel: t?.minLevel ?? Level.P12,
    maxLevel: t?.maxLevel ?? Level.N1,
    disciplines: t?.disciplines ?? [],
    prices: t?.prices.map((p) => `${p}`) ?? [],
    links: t?.links ?? [],
    freezed: t?.freezed ?? false,
  };
}

export default function FormTournament({
  players,
  onSubmit,
  error,
  tournament,
}: Props) {
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!error) {
      setErrorMsg("");
    } else {
      setErrorMsg("Erreur à la création du tournoi");
    }
  }, [error]);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm<FormTournamentInputs>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues(tournament),
  });

  useEffect(() => {
    reset(defaultValues(tournament));
  }, [tournament, reset]);

  function submit(data: FormTournamentInputs) {
    onSubmit({
      ...data,
      startDate: parse(
        data.startDate,
        "dd/MM/yyyy",
        new Date()
      ).toISOString(),
      endDate: parse(
        data.endDate,
        "dd/MM/yyyy",
        new Date()
      ).toISOString(),
      prices: data.prices.map((price) => parseFloat(price)),
    });
    reset();
  }

  return (
    <form
      className={FormTournamentStyle.base}
      onSubmit={handleSubmit(submit)}
    >
      {error && (
        <div className={FormTournamentStyle.error}>
          <Alert type="error">{errorMsg}</Alert>
        </div>
      )}

      <Controller
        name="inChargeId"
        control={control}
        render={({ field: { onChange, value } }) => (
          <InputSelectMembers
            value={players.find((p) => p.id === value)}
            players={players}
            onChange={(member) => onChange(member?.id ?? "")}
            placeholder="Responsable du tournoi"
          />
        )}
      />

      <Controller
        name="name"
        control={control}
        render={({ field: { value, onChange } }) => (
          <InputText
            value={value}
            onChange={onChange}
            placeholder="Nom du tournoi"
            inError={!!errors.name?.message}
            width="sm:w-96"
          />
        )}
      />

      <div className={FormTournamentStyle.row}>
        <Controller
          name="location"
          control={control}
          render={({ field: { value, onChange } }) => (
            <InputText
              value={value}
              onChange={onChange}
              placeholder="Lieu"
              inError={!!errors.name?.message}
            />
          )}
        />
        <Controller
          name="disciplines"
          control={control}
          render={({ field: { value, onChange } }) => (
            <InputTag
              value={value}
              onChange={(val) => onChange(val as Discipline[])}
              list={DISCIPLINES}
            />
          )}
        />
      </div>

      <div className={FormTournamentStyle.row}>
        <Controller
          name="startDate"
          control={control}
          render={({ field: { value, onChange } }) => (
            <InputText
              value={value}
              onChange={onChange}
              placeholder="Début tournoi (dd/mm/yyyy)"
              inError={!!errors.name?.message}
              width="sm:w-72"
            />
          )}
        />
        <Controller
          name="endDate"
          control={control}
          render={({ field: { value, onChange } }) => (
            <InputText
              value={value}
              onChange={onChange}
              placeholder="Fin tournoi (dd/mm/yyyy)"
              inError={!!errors.name?.message}
              width="sm:w-72"
            />
          )}
        />
      </div>

      <Controller
        name="prices"
        control={control}
        render={({ field: { value, onChange } }) => (
          <InputArray
            label="Prix des tableaux"
            addLabel="Ajouter un prix"
            placeholder="{i} tab"
            value={value}
            onChange={onChange}
            width="sm:w-24"
          />
        )}
      />

      <Controller
        name="minLevel"
        control={control}
        render={({ field: { value, onChange } }) => (
          <InputTag
            value={[value]}
            onChange={(val) => onChange(val[0] as Level)}
            list={LEVELS}
            label="Niveau minimum"
            unique
          />
        )}
      />
      <Controller
        name="maxLevel"
        control={control}
        render={({ field: { value, onChange } }) => (
          <InputTag
            value={[value]}
            onChange={(val) => onChange(val[0] as Level)}
            list={LEVELS}
            label="Niveau maximum"
            unique
          />
        )}
      />
      <Controller
        name="links"
        control={control}
        render={({ field: { value, onChange } }) => (
          <InputLabels
            label="Liens"
            addLabel="Ajouter un lien"
            namePlaceholder="Nom"
            valuePlaceholder="Lien"
            value={value?.map((val) => [val.name, val.url])}
            onChange={(val) =>
              onChange(val?.map((v) => ({ name: v[0], url: v[1] })))
            }
          />
        )}
      />

      <Controller
        name="freezed"
        control={control}
        render={({ field: { value, onChange } }) => (
          <InputCheckbox
            checked={!!value}
            onChange={onChange}
            children="Bloquer les inscriptions"
          />
        )}
      />

      <div className="flex gap-2">
        <Button disabled={!isValid || !isDirty}>
          {tournament ? "Modifier" : "Ajouter"}
        </Button>
        {tournament && (
          <Button
            onClick={() => reset(defaultValues(tournament))}
            disabled={!isDirty}
            variant="light"
          >
            Annuler
          </Button>
        )}
      </div>
    </form>
  );
}
