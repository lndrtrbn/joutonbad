import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { faInfo, faXmark } from "@fortawesome/free-solid-svg-icons";

import {
  RegistrationDoubleInputs,
  RegistrationDoubleSchema,
} from "../../../utils/registration";
import MIcon from "../MIcon/MIcon";
import MText from "../MText/MText";
import MButton from "../MButton/MButton";
import useFetch from "../../../http/useFetch";
import { Player } from "../../../utils/player";
import MCardInfo from "../MCardInfo/MCardInfo";
import MInputText from "../MInputText/MInputText";
import { subsetLevels } from "../../../utils/level";
import MInputLabel from "../MInputLabel/MInputLabel";
import { Tournament } from "../../../utils/tournament";
import { Discipline } from "../../../utils/discipline";
import useHttpPlayer from "../../../http/useHttpPlayer";
import MInputSwitch from "../MInputSwitch/MInputSwitch";
import MInputSelect from "../MInputSelect/MInputSelect";
import MInputCheckbox from "../MInputCheckbox/MInputCheckbox";
import { useAuthContext } from "../../../contexts/auth.context";
import MFormRegistrationDoubleStyle from "./MFormRegistrationDouble.style";
import { CreateRegistrationPayload } from "../../../http/useHttpRegistration";

type Props = {
  tournament: Tournament;
  canRegister: boolean;
  onSubmit: (data: CreateRegistrationPayload) => void;
  isMixte?: boolean;
  style?: string;
};

export default function MFormRegistrationDouble({
  tournament,
  onSubmit,
  style,
  canRegister,
  isMixte = false,
}: Props) {
  const {
    user: [user],
  } = useAuthContext();

  const { getAllPlayers } = useHttpPlayer();
  const [players] = useFetch(getAllPlayers);

  const [partnerClub, setPartnerClub] = useState(true);
  const [partner, setPartner] = useState<Player>();

  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    reset,
    formState: { isValid, isDirty },
  } = useForm<RegistrationDoubleInputs>({
    resolver: zodResolver(RegistrationDoubleSchema),
    defaultValues: {
      partnerName: "",
      partnerLastname: "",
      partnerClub: "",
      partnerLicense: "",
      registerPartner: true,
    },
  });

  if (!user) return null;

  const registration = tournament.registrations.find(
    (reg) =>
      reg.player.license == user.license &&
      !reg.cancelled &&
      ((isMixte && reg.discipline == Discipline.DM) ||
        (!isMixte &&
          (reg.discipline == Discipline.DD ||
            reg.discipline == Discipline.DH)))
  );

  if (!registration && !canRegister) return null;

  function submit(data: RegistrationDoubleInputs) {
    if (user && data.discipline && data.rank) {
      const payload: CreateRegistrationPayload = {
        discipline: data.discipline,
        level: data.rank,
        tournamentId: tournament.id,
        playerLicense: user?.license,
        registerPartner: data.registerPartner,
        partner: {
          club: data.partnerClub,
          lastname: data.partnerLastname,
          name: data.partnerName,
          license: data.partnerLicense,
          level: data.partnerRank,
        },
      };
      onSubmit(payload);
    }
  }

  return (
    <form
      className={twMerge(MFormRegistrationDoubleStyle.base, style)}
      onSubmit={handleSubmit(submit)}
    >
      <MText type="accent">
        Inscription {isMixte ? "Mixte" : "Double"}
      </MText>

      {registration ? (
        <MText type="small" color="text-m-moonlight60">
          Inscrit.e avec {registration.partner?.lastname}{" "}
          {registration.partner?.name} ({registration.partner?.club})
        </MText>
      ) : (
        <>
          <Controller
            name="discipline"
            control={control}
            render={({ field: { value, onChange } }) => (
              <MInputLabel name="Tableau">
                <MInputSwitch
                  items={
                    isMixte
                      ? [Discipline.DM]
                      : [Discipline.DD, Discipline.DH]
                  }
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
                    tournament.maxLevel
                  )}
                  value={value}
                  onChange={onChange}
                  style="-mx-6 px-6"
                />
              </MInputLabel>
            )}
          />

          <Controller
            name="partnerRank"
            control={control}
            render={({ field: { value, onChange } }) => (
              <MInputLabel name="Classement partenaire">
                <MInputSwitch
                  items={subsetLevels(
                    tournament.minLevel,
                    tournament.maxLevel
                  )}
                  value={value}
                  onChange={onChange}
                  style="-mx-6 px-6"
                />
              </MInputLabel>
            )}
          />

          <MInputCheckbox
            value={partnerClub}
            onChange={setPartnerClub}
            children="Partenaire dans le club du REC"
          />

          {partnerClub && (
            <>
              <MInputSelect
                value={partner}
                onChange={(player) => {
                  setPartner(player);
                  setValue("partnerName", player?.name ?? "");
                  setValue("partnerLicense", player?.license ?? "");
                  setValue("partnerLastname", player?.lastname ?? "");
                  setValue("partnerClub", "REC");
                  trigger();
                }}
                style="w-full sm:w-[380px]"
                placeholder="Partenaire"
                items={(players ?? []).sort((a, b) =>
                  a.name.localeCompare(b.name)
                )}
                toLabel={(p) =>
                  `${p.lastname} ${p.name}, ${p.license.padStart(
                    8,
                    "0"
                  )}`
                }
              />

              <Controller
                name="registerPartner"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <MInputCheckbox
                    value={!value}
                    onChange={(val) => onChange(!val)}
                    children="Mon/Ma partenaire s'est inscrit.e par ses propres moyens"
                  />
                )}
              />
              <MCardInfo icon={faInfo}>
                <MText type="small" color="text-m-moonlight60">
                  Coche la case ci-dessus si ton ou ta partenaire a
                  déjà réglé son inscription de son côté
                </MText>
              </MCardInfo>
            </>
          )}

          {!partnerClub && (
            <>
              <Controller
                name="partnerName"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <MInputText
                    value={value}
                    onChange={onChange}
                    onReset={() => onChange("")}
                    placeholder="Prénom partenaire"
                  />
                )}
              />

              <Controller
                name="partnerLastname"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <MInputText
                    value={value}
                    onChange={onChange}
                    onReset={() => onChange("")}
                    placeholder="Nom partenaire"
                  />
                )}
              />

              <Controller
                name="partnerLicense"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <MInputText
                    value={value}
                    onChange={onChange}
                    onReset={() => onChange("")}
                    type="number"
                    placeholder="Licence partenaire"
                  />
                )}
              />

              <Controller
                name="partnerClub"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <MInputText
                    value={value}
                    onChange={onChange}
                    onReset={() => onChange("")}
                    placeholder="Club partenaire"
                  />
                )}
              />
            </>
          )}

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
