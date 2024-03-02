import { twMerge } from "tailwind-merge";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import {
  RegistrationSingleInputs,
  RegistrationSingleSchema,
} from "../../../utils/registration";
import MText from "../MText/MText";
import MIcon from "../MIcon/MIcon";
import MButton from "../MButton/MButton";
import { subsetLevels } from "../../../utils/level";
import MInputLabel from "../MInputLabel/MInputLabel";
import { Tournament } from "../../../utils/tournament";
import { Discipline } from "../../../utils/discipline";
import MInputSwitch from "../MInputSwitch/MInputSwitch";
import { useAuthContext } from "../../../contexts/auth.context";
import MFormRegistrationSingleStyle from "./MFormRegistrationSingle.style";
import { CreateRegistrationPayload } from "../../../http/useHttpRegistration";

type Props = {
  tournament: Tournament;
  canRegister: boolean;
  onSubmit: (data: CreateRegistrationPayload) => void;
  style?: string;
};

export default function MFormRegistrationSingle({
  tournament,
  onSubmit,
  canRegister,
  style,
}: Props) {
  const {
    user: [user],
  } = useAuthContext();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, isDirty },
  } = useForm<RegistrationSingleInputs>({
    resolver: zodResolver(RegistrationSingleSchema),
  });

  if (!user) return null;

  const registration = tournament.registrations.find(
    (reg) =>
      reg.player.license == user?.license &&
      !reg.cancelled &&
      (reg.discipline == Discipline.SD ||
        reg.discipline == Discipline.SH),
  );

  if (!registration && !canRegister) return null;

  function submit(data: RegistrationSingleInputs) {
    if (user && data.discipline && data.rank) {
      const payload: CreateRegistrationPayload = {
        discipline: data.discipline,
        level: data.rank,
        tournamentId: tournament.id,
        playerLicense: user?.license,
      };
      onSubmit(payload);
    }
  }

  return (
    <form
      className={twMerge(MFormRegistrationSingleStyle.base, style)}
      onSubmit={handleSubmit(submit)}
    >
      <MText type="accent">Inscription Simple</MText>

      {registration ? (
        <MText type="small" color="text-m-moonlight/60">
          Inscrit.e
        </MText>
      ) : (
        <>
          <Controller
            name="discipline"
            control={control}
            render={({ field: { value, onChange } }) => (
              <MInputLabel name="Tableau">
                <MInputSwitch
                  items={[Discipline.SD, Discipline.SH]}
                  value={value}
                  onChange={onChange}
                  style="-mx-6 px-6"
                />
              </MInputLabel>
            )}
          />

          <Controller
            name="rank"
            control={control}
            render={({ field: { value, onChange } }) => (
              <MInputLabel name="Classement">
                <MInputSwitch
                  items={subsetLevels(
                    tournament.minLevel,
                    tournament.maxLevel,
                  )}
                  value={value}
                  onChange={onChange}
                  style="-mx-6 px-6"
                />
              </MInputLabel>
            )}
          />

          <div className="flex gap-4 items-center">
            <MButton disabled={!isValid} style="flex-1">
              Envoyer l'inscription
            </MButton>
            <MIcon
              disabled={!isDirty}
              icon={faXmark}
              onClick={() => reset()}
            />
          </div>
        </>
      )}
    </form>
  );
}
