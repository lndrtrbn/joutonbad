import { useEffect, useState } from "react";

import Box from "../../components/Box/Box";
import useFetch from "../../http/useFetch";
import Title from "../../components/Title/Title";
import { useQueryPlayers } from "../../http/useHttpPlayer";
import { Registration } from "../../utils/registration";
import Separator from "../../components/Separator/Separator";
import useHttpTournament from "../../http/useHttpTournament";
import useHttpRegistration from "../../http/useHttpRegistration";
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

  const { data: players } = useQueryPlayers();

  const { getAllTournaments } = useHttpTournament();
  const [tournaments, refetchTournaments] =
    useFetch(getAllTournaments);

  async function onSend(id: string) {
    await updateRegistration(id, { sent: true });
    await refetch();
  }

  async function onDelete(id: string) {
    await deleteRegistration(id);
    await refetch();
  }

  async function onCancel(id: string, reason: string) {
    await updateRegistration(id, { cancelled: reason });
    await refetch();
  }

  async function refetch() {
    await refetchRegistrations();
    await refetchTournaments();
  }

  return (
    <>
      <Title size="3xl">Gestion des inscriptions</Title>
      <Separator />

      <div className={AdminRegistrationsPageStyle.base}>
        <Box title="Inscrire un.e membre" style="max-w-[780px]">
          <RegistrationAdminForm
            players={players ?? []}
            tournaments={tournaments ?? []}
            onRegistration={refetch}
          />
        </Box>

        <Box
          title={`Inscriptions à faire (${registrationsToDo.length})`}
          mobileFull
          style="max-w-[1100px]"
        >
          <RegistrationsList
            registrations={registrationsToDo}
            onDelete={onDelete}
            onSend={onSend}
            onCancel={onCancel}
            noResultLabel="Aucune inscription à gérer, tu peux te reposer"
          />
        </Box>

        <Box
          title={`Inscriptions validées (${registrationsDone.length})`}
          mobileFull
          style="max-w-[1100px]"
        >
          <RegistrationsList
            registrations={registrationsDone}
            onDelete={onDelete}
            onCancel={onCancel}
            noResultLabel="Pas encore d'inscriptions validées"
          />
        </Box>

        <Box
          title={`Inscriptions annulées (${registrationsCancelled.length})`}
          mobileFull
          style="max-w-[1100px]"
        >
          <RegistrationsList
            registrations={registrationsCancelled}
            onDelete={onDelete}
            noResultLabel="Pas encore d'inscriptions annulées"
          />
        </Box>
      </div>
    </>
  );
}
