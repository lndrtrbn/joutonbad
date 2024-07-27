import { useEffect, useState } from "react";

import {
  useDeleteRegistration,
  useQueryRegistrations,
  useUpdateRegistration,
} from "../../http/useHttpRegistration";
import Box from "../../components/Box/Box";
import Title from "../../components/Title/Title";
import { Registration } from "../../utils/registration";
import { useQueryPlayers } from "../../http/useHttpPlayer";
import Separator from "../../components/Separator/Separator";
import { useQueryTournaments } from "../../http/useHttpTournament";
import RegistrationsList from "./RegistrationsList/RegistrationsList";
import AdminRegistrationsPageStyle from "./AdminRegistrationsPage.style";
import RegistrationAdminForm from "./RegistrationAdminForm/RegistrationAdminForm";

export default function AdminRegistrationsPage() {
  const { data: players } = useQueryPlayers();
  const { data: tournaments } = useQueryTournaments();
  const { data: registrations } = useQueryRegistrations();
  const { mutateAsync: deleteRegistration } = useDeleteRegistration();
  const { mutateAsync: updateRegistration } = useUpdateRegistration();

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

  async function onSend(id: string) {
    const payload = { sent: true };
    await updateRegistration({ id, payload });
  }

  async function onCancel(id: string, reason: string) {
    const payload = { cancelled: reason };
    await updateRegistration({ id, payload });
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
          />
        </Box>

        <Box
          title={`Inscriptions à faire (${registrationsToDo.length})`}
          mobileFull
          style="max-w-[1100px]"
        >
          <RegistrationsList
            registrations={registrationsToDo}
            onDelete={deleteRegistration}
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
            onDelete={deleteRegistration}
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
            onDelete={deleteRegistration}
            noResultLabel="Pas encore d'inscriptions annulées"
          />
        </Box>
      </div>
    </>
  );
}
