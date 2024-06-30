import { useEffect, useState } from "react";

import useFetch from "../../../http/useFetch";
import Title from "../../../components/Title/Title";
import useHttpPlayer from "../../../http/useHttpPlayer";
import { Registration } from "../../../utils/registration";
import Separator from "../../../components/Separator/Separator";
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
        <section className="flex-1 max-w-full sm:border border-black/10 sm:p-6 rounded-2xl sm:max-w-[780px]">
          <RegistrationAdminForm
            players={players ?? []}
            tournaments={tournaments ?? []}
            onRegistration={refetch}
          />
        </section>

        <section className="flex-1 max-w-full sm:border border-black/10 sm:p-6 rounded-2xl sm:max-w-[1140px]">
          <RegistrationsList
            registrations={registrationsToDo}
            onDelete={onDelete}
            onSend={onSend}
            onCancel={onCancel}
            title="Inscriptions à faire"
            noResultLabel="Aucune inscription à gérer, tu peux te reposer"
          />
        </section>

        <section className="flex-1 max-w-full sm:border border-black/10 sm:p-6 rounded-2xl sm:max-w-[1140px]">
          <RegistrationsList
            registrations={registrationsDone}
            onDelete={onDelete}
            onCancel={onCancel}
            title="Inscriptions validées"
            noResultLabel="Pas encore d'inscriptions validées"
          />
        </section>

        <section className="flex-1 max-w-full sm:border border-black/10 sm:p-6 rounded-2xl sm:max-w-[1140px]">
          <RegistrationsList
            registrations={registrationsCancelled}
            onDelete={onDelete}
            title="Inscriptions annulées"
            noResultLabel="Pas encore d'inscriptions annulées"
          />
        </section>
      </div>
    </>
  );
}
