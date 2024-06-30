import { useEffect, useState } from "react";

import {
  Registration,
  RegistrationDoubleInputs,
} from "../../utils/registration";
import Alert from "../Alert/Alert";
import Title from "../Title/Title";
import { Discipline } from "../../utils/discipline";
import { Tournament } from "../../utils/tournament";
import { APIError, APIErrorMessage } from "../../utils/error";
import { CreateRegistrationPayload } from "../../http/useHttpRegistration";
import FormRegistrationDouble from "./FormRegistrationDouble/FormRegistrationDouble";

type Props = {
  tournament: Tournament;
  registrations: Registration[];
  playerLicense: string;
  discipline: Discipline;
  canRegister: boolean;
  loading?: boolean;
  register: (data: CreateRegistrationPayload) => void;
  error?: APIError;
};

export default function RegistrationDouble({
  tournament,
  registrations = [],
  playerLicense,
  discipline,
  canRegister,
  loading = false,
  register,
  error,
}: Props) {
  const [errorMsg, setErrorMsg] = useState<string>();

  const isMixte = discipline == Discipline.DM;

  const registration = registrations.find(
    (reg) =>
      reg.player.license == playerLicense &&
      !reg.cancelled &&
      ((isMixte && reg.discipline == Discipline.DM) ||
        (!isMixte &&
          (reg.discipline == Discipline.DD ||
            reg.discipline == Discipline.DH))),
  );

  function registerDouble(data: RegistrationDoubleInputs) {
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
    register(payload);
  }

  useEffect(() => {
    if (error) {
      switch (error.message) {
        case APIErrorMessage.ALREADY_REGISTERED:
          setErrorMsg(
            "Tu es déjà inscrit.e à ce tournoi sur ce tableau",
          );
          break;
        case APIErrorMessage.ALREADY_REGISTERED_PARTNER:
          setErrorMsg(
            "Ton/ta partenaire est déjà inscrit.e avec une autre personne",
          );
          break;
        default:
          setErrorMsg("Erreur lors de l'inscription");
          break;
      }
    } else {
      setErrorMsg("");
    }
  }, [error]);

  if (!registration && !canRegister) return null;

  const disciplines = isMixte
    ? [Discipline.DM]
    : tournament.disciplines.filter(
        (d) => d === Discipline.DD || d === Discipline.DH,
      );

  return (
    <div>
      <Title size="2xl">
        Inscription en {isMixte ? "Mixte" : "Double"}
      </Title>

      {!registration ? (
        <>
          <FormRegistrationDouble
            onSubmit={registerDouble}
            loading={loading}
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
