import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import {
  RegistrationDoubleInputs,
  RegistrationDoubleSchema,
} from "../../../utils/registration";
import Title from "../../Title/Title";
import Button from "../.././Button/Button";
import useFetch from "../../../http/useFetch";
import { Player } from "../../../utils/player";
import InputTag from "../.././InputTag/InputTag";
import InputText from "../.././InputText/InputText";
import { LEVELS, Level } from "../../../utils/level";
import { Discipline } from "../../../utils/discipline";
import useHttpPlayer from "../../../http/useHttpPlayer";
import InputCheckbox from "../../InputCheckbox/InputCheckbox";
import FormRegistrationDoubleStyle from "./FormRegistrationDouble.style";
import InputSelectMembers from "../../InputSelectMembers/InputSelectMembers";

type Props = {
  isMixte?: boolean;
  onSubmit: (data: RegistrationDoubleInputs) => void;
};

export default function FormRegistrationDouble({
  isMixte = false,
  onSubmit,
}: Props) {
  const { getAllPlayers } = useHttpPlayer();
  const [players] = useFetch(getAllPlayers);

  const [partnerClub, setPartnerClub] = useState(true);
  const [partner, setPartner] = useState<Player>();

  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    formState: { isValid },
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

  return (
    <form
      className={FormRegistrationDoubleStyle.base}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="discipline"
        control={control}
        render={({ field: { value, onChange } }) => (
          <InputTag
            value={[value]}
            onChange={(val) => onChange(val[0] as Discipline)}
            list={
              isMixte
                ? [Discipline.DM]
                : [Discipline.DH, Discipline.DD]
            }
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
            value={[value]}
            onChange={(val) => onChange(val[0] as Level)}
            list={LEVELS}
            label="Classement"
            unique
          />
        )}
      />

      <Controller
        name="partnerRank"
        control={control}
        render={({ field: { value, onChange } }) => (
          <InputTag
            value={[value]}
            onChange={(val) => onChange(val[0] as Level)}
            list={LEVELS}
            label="Classement partenaire"
            unique
          />
        )}
      />

      <InputCheckbox
        checked={partnerClub}
        onChange={setPartnerClub}
        children="Partenaire dans le club du REC"
      />

      {partnerClub && (
        <>
          <InputSelectMembers
            value={partner}
            onChange={(player) => {
              setPartner(player);
              setValue("partnerName", player?.name ?? "");
              setValue("partnerLicense", player?.license ?? "");
              setValue("partnerLastname", player?.lastname ?? "");
              setValue("partnerClub", "REC");
              trigger();
            }}
            players={players ?? []}
            placeholder="Partenaire"
          />

          <div>
            <Controller
              name="registerPartner"
              control={control}
              render={({ field: { value, onChange } }) => (
                <InputCheckbox
                  checked={!value}
                  onChange={(val) => onChange(!val)}
                  children="Mon/Ma partenaire s'est inscrit.e par ses propres moyens"
                />
              )}
            />
            <Title subtitle>
              Coche la case ci-dessus si ton ou ta partenaire a déjà
              réglé son inscription de son côté
            </Title>
          </div>
        </>
      )}

      {!partnerClub && (
        <>
          <div className={FormRegistrationDoubleStyle.row}>
            <Controller
              name="partnerName"
              control={control}
              render={({ field: { value, onChange } }) => (
                <InputText
                  value={value}
                  onChange={onChange}
                  placeholder="Prénom partenaire"
                />
              )}
            />
            <Controller
              name="partnerLastname"
              control={control}
              render={({ field: { value, onChange } }) => (
                <InputText
                  value={value}
                  onChange={onChange}
                  placeholder="Nom partenaire"
                />
              )}
            />
            <Controller
              name="partnerLicense"
              control={control}
              render={({ field: { value, onChange } }) => (
                <InputText
                  value={value}
                  onChange={onChange}
                  placeholder="Licence partenaire"
                  style="sm:w-48"
                />
              )}
            />
          </div>

          <div className={FormRegistrationDoubleStyle.row}>
            <Controller
              name="partnerClub"
              control={control}
              render={({ field: { value, onChange } }) => (
                <InputText
                  value={value}
                  onChange={onChange}
                  placeholder="Club partenaire"
                />
              )}
            />
          </div>
        </>
      )}

      <Button disabled={!isValid}>Envoyer l'inscription</Button>
    </form>
  );
}
