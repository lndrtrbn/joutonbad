import { useEffect, useState } from "react";

import {
  CreateRegistrationPayload,
  useCreateRegistration,
} from "../../http/useHttpRegistration";
import FormRegistrationDouble, {
  RegistrationDoubleInputs,
} from "./FormRegistrationDouble/FormRegistrationDouble";
import Alert from "../Alert/Alert";
import Title from "../Title/Title";
import { Discipline } from "../../utils/discipline";
import { Tournament } from "../../utils/tournament";
import { APIErrorMessage } from "../../utils/error";

type Props = {
  tournament: Tournament;
  playerLicense: string;
  discipline: Discipline;
  canRegister: boolean;
  onSuccess?: () => void;
};

export default function RegistrationDouble({
  tournament,
  playerLicense,
  discipline,
  canRegister,
  onSuccess,
}: Props) {
  const [errorMsg, setErrorMsg] = useState("");
  const { mutateAsync, error, isPending } = useCreateRegistration();

  const isMixte = discipline == Discipline.DM;

  useEffect(() => {
    if (!error) {
      setErrorMsg("");
    } else if (error.message === APIErrorMessage.ALREADY_REGISTERED) {
      setErrorMsg("Tu es déjà inscrit.e à ce tournoi sur ce tableau");
    } else if (error.message === APIErrorMessage.ALREADY_REGISTERED_PARTNER) {
      setErrorMsg("Ton/ta partenaire est déjà inscrit.e avec une autre personne");
    } else {
      setErrorMsg("Erreur lors de l'inscription");
    }
  }, [error]);

  const registration = tournament.registrations.find(
    (reg) =>
      reg.player.license == playerLicense &&
      !reg.cancelled &&
      ((isMixte && reg.discipline == Discipline.DM) ||
        (!isMixte &&
          (reg.discipline == Discipline.DD || reg.discipline == Discipline.DH))),
  );

  function submit(data: RegistrationDoubleInputs) {
    const payload: CreateRegistrationPayload = {
      discipline: data.discipline,
      level: data.rank,
      tournamentId: tournament.id,
      playerLicense,
      registerPartner: data.registerPartner,
      partner: {
        club: data.partnerClub,
        lastname: data.partnerLastname,
        name: data.partnerName,
        license: data.partnerLicense,
        level: data.partnerRank,
      },
    };
    mutateAsync(payload, { onSuccess });
  }

  if (!registration && !canRegister) return null;

  const disciplines = isMixte
    ? [Discipline.DM]
    : tournament.disciplines.filter(
        (d) => d === Discipline.DD || d === Discipline.DH,
      );

  return (
    <div>
      <Title size="2xl">Inscription en {isMixte ? "Mixte" : "Double"}</Title>

      {!registration ? (
        <>
          <FormRegistrationDouble
            onSubmit={submit}
            loading={isPending}
            disciplines={disciplines}
          />
          {errorMsg && <Alert type="error">{errorMsg}</Alert>}
        </>
      ) : (
        <Title subtitle>
          Inscrit.e avec {registration.partner?.lastname}{" "}
          {registration.partner?.name} ({registration.partner?.club})
        </Title>
      )}
    </div>
  );
}
