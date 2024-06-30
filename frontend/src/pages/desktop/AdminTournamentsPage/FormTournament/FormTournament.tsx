import * as z from "zod";
import { twMerge } from "tailwind-merge";
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
import { TournamentPayload } from "../../../../http/useHttpTournament";
import InputLabels from "../../../../components/InputLabels/InputLabels";
import InputCheckbox from "../../../../components/InputCheckbox/InputCheckbox";
import ButtonLoading from "../../../../components/ButtonLoading/ButtonLoading";
import InputSelectMembers from "../../../../components/InputSelectMembers/InputSelectMembers";

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
  freezed: boolean;
  nocturne: boolean;
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
    }),
  ),
  freezed: z.boolean(),
  nocturne: z.boolean(),
});

type Props = {
  players: Player[];
  onSubmit: (data: TournamentPayload) => void;
  error?: APIError;
  tournament?: Tournament;
  loading?: boolean;
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
    nocturne: t?.nocturne ?? false,
  };
}

export default function FormTournament({
  players,
  onSubmit,
  error,
  tournament,
  loading = false,
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
        new Date(),
      ).toISOString(),
      endDate: parse(
        data.endDate,
        "dd/MM/yyyy",
        new Date(),
      ).toISOString(),
      prices: data.prices.map((price) => parseFloat(price)),
    });
    !tournament && reset();
  }

  return (
    <form
      className={FormTournamentStyle.base}
      onSubmit={handleSubmit(submit)}
    >
      <div
        className={twMerge(
          FormTournamentStyle.col,
          "sm:flex-1 sm:grow-[5] w-full",
        )}
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
              placeholder="Responsable REC"
            />
          )}
        />

        <div className={FormTournamentStyle.row}>
          <Controller
            name="name"
            control={control}
            render={({ field: { value, onChange } }) => (
              <InputText
                value={value}
                onChange={onChange}
                placeholder="Nom du tournoi"
                inError={!!errors.name?.message}
                width="sm:flex-1"
              />
            )}
          />
          <Controller
            name="location"
            control={control}
            render={({ field: { value, onChange } }) => (
              <InputText
                value={value}
                onChange={onChange}
                placeholder="Lieu"
                inError={!!errors.name?.message}
                width="sm:flex-1"
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
                placeholder="Début (dd/mm/yyyy)"
                inError={!!errors.name?.message}
                width="sm:flex-1"
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
                placeholder="Fin (dd/mm/yyyy)"
                inError={!!errors.name?.message}
                width="sm:flex-1"
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
              placeholder="{i} tab."
              value={value}
              onChange={onChange}
              width="w-20"
            />
          )}
        />

        <Controller
          name="links"
          control={control}
          render={({ field: { value, onChange } }) => (
            <InputLabels
              label="Liens"
              namePlaceholder="Nom"
              valuePlaceholder="Lien"
              value={value?.map((val) => [val.name, val.url])}
              onChange={(val) =>
                onChange(val?.map((v) => ({ name: v[0], url: v[1] })))
              }
            />
          )}
        />
      </div>

      <div
        className={twMerge(
          FormTournamentStyle.col,
          "sm:flex-1 sm:grow-[4] w-full",
        )}
      >
        <Controller
          name="disciplines"
          control={control}
          render={({ field: { value, onChange } }) => (
            <InputTag
              label="Tableaux"
              value={value}
              onChange={(val) => onChange(val as Discipline[])}
              list={DISCIPLINES}
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
          name="nocturne"
          control={control}
          render={({ field: { value, onChange } }) => (
            <InputCheckbox
              checked={!!value}
              onChange={onChange}
              children="Tournoi nocturne"
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
        <Alert type="info">
          En cochant la case, les membres ne pourront pas s'inscrire
          au tournois
        </Alert>

        <div className="flex flex-col gap-2">
          <ButtonLoading
            disabled={!isValid || !isDirty || loading}
            loading={loading}
            style="w-full"
          >
            {tournament ? "Modifier" : "Ajouter"} le tournoi
          </ButtonLoading>
          {tournament && (
            <Button
              onClick={() => reset(defaultValues(tournament))}
              disabled={!isDirty || loading}
              variant="light"
              style="w-full"
            >
              Annuler les modifications
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
