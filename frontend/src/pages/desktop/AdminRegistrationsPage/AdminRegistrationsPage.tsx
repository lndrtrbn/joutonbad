import { useEffect, useState } from "react";

import useFetch from "../../../http/useFetch";
import useHttpPlayer from "../../../http/useHttpPlayer";
import { Registration } from "../../../utils/registration";
import useHttpTournament from "../../../http/useHttpTournament";
import useHttpRegistration from "../../../http/useHttpRegistration";
import RegistrationsList from "./RegistrationsList/RegistrationsList";
import AdminRegistrationsPageStyle from "./AdminRegistrationsPage.style";
import RegistrationAdminForm from "./RegistrationAdminForm/RegistrationAdminForm";

export default function AdminRegistrationsPage() {
  const {
    getAllRegistrations,
    updateRegistration,
    deleteRegistration,
  } = useHttpRegistration();
  const [registrations, refetchRegistrations] = useFetch(
    getAllRegistrations,
  );

  const [registrationsToDo, setTodo] = useState<Registration[]>([]);
  const [registrationsDone, setDone] = useState<Registration[]>([]);
  const [registrationsCancelled, setCancelled] = useState<
    Registration[]
  >([]);

  useEffect(() => {
    if (registrations) {
      setTodo(registrations.filter((r) => !r.sent && !r.cancelled));
      setDone(registrations.filter((r) => r.sent && !r.cancelled));
      setCancelled(registrations.filter((r) => r.cancelled));
    }
  }, [registrations]);

  const { getAllPlayers } = useHttpPlayer();
  const [players] = useFetch(getAllPlayers);

  const { getAllTournaments } = useHttpTournament();
  const [tournaments, refetchTournaments] =
    useFetch(getAllTournaments);

  async function onSend(id: string) {
    await updateRegistration(id, { sent: true });
    refetch();
  }

  async function onDelete(id: string) {
    await deleteRegistration(id);
    refetch();
  }

  async function onCancel(id: string, reason: string) {
    await updateRegistration(id, { cancelled: reason });
    refetch();
  }

  function refetch() {
    refetchRegistrations();
    refetchTournaments();
  }

  return (
    <div className={AdminRegistrationsPageStyle.base}>
      <RegistrationAdminForm
        players={players ?? []}
        tournaments={tournaments ?? []}
        onRegistration={refetch}
      />

      <RegistrationsList
        registrations={registrationsToDo}
        onDelete={onDelete}
        onSend={onSend}
        onCancel={onCancel}
        title="Inscriptions à faire"
        subtitle="Ci-dessous se trouvent les inscriptions demandées par les membres et qui n'ont pas encore été envoyées"
        noResultLabel="Aucune inscription à gérer, tu peux te reposer"
      />

      <RegistrationsList
        registrations={registrationsDone}
        onDelete={onDelete}
        onCancel={onCancel}
        title="Inscriptions validées"
        subtitle="Ci-dessous se trouvent les inscriptions déjà envoyées"
        noResultLabel="Pas encore d'inscriptions validées"
      />

      <RegistrationsList
        registrations={registrationsCancelled}
        onDelete={onDelete}
        title="Inscriptions annulées"
        subtitle="Ci-dessous se trouvent les inscriptions annulées"
        noResultLabel="Pas encore d'inscriptions annulées"
      />
    </div>
  );
}
