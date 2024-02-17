import { useEffect, useState } from "react";

import {
  Registration,
  RegistrationDoubleInputs,
} from "../../utils/registration";
import Alert from "../Alert/Alert";
import Title from "../Title/Title";
import { Discipline } from "../../utils/discipline";
import { APIError, APIErrorMessage } from "../../utils/error";
import RegistrationDoubleStyle from "./RegistrationDouble.style";
import { CreateRegistrationPayload } from "../../http/useHttpRegistration";
import FormRegistrationDouble from "./FormRegistrationDouble/FormRegistrationDouble";

type Props = {
  tournamentId: string;
  registrations: Registration[];
  playerLicense: string;
  discipline: Discipline;
  canRegister: boolean;
  register: (data: CreateRegistrationPayload) => void;
  error?: APIError;
};

export default function RegistrationDouble({
  tournamentId,
  registrations = [],
  playerLicense,
  discipline,
  canRegister,
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
            reg.discipline == Discipline.DH)))
  );

  function registerDouble(data: RegistrationDoubleInputs) {
    const payload: CreateRegistrationPayload = {
      discipline: data.discipline,
      level: data.rank,
      tournamentId,
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
            "Tu es déjà inscrit.e à ce tournoi sur ce tableau"
          );
          break;
        case APIErrorMessage.ALREADY_REGISTERED_PARTNER:
          setErrorMsg(
            "Ton/ta partenaire est déjà inscrit.e avec une autre personne"
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

  return (
    <div className={RegistrationDoubleStyle.base}>
      <Title size="2xl">
        Tableau de {isMixte ? "Mixte" : "Double"}
      </Title>

      {!registration ? (
        <>
          <FormRegistrationDouble
            isMixte={isMixte}
            onSubmit={registerDouble}
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
