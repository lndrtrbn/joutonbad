import { useMemo, useState } from "react";

import useFetch from "../../../http/useFetch";
import MemberRow from "./MemberRow/MemberRow";
import FormMember from "./FormMember/FormMember";
import Title from "../../../components/Title/Title";
import useHttpPlayer from "../../../http/useHttpPlayer";
import useCreateMember from "../../../hooks/useCreateMember";
import AdminMembersPageStyle from "./AdminMembersPage.style";
import Separator from "../../../components/Separator/Separator";
import FormMembersUpload from "./FormMembersUpload/FormMembersUpload";
import InputCheckbox from "../../../components/InputCheckbox/InputCheckbox";

export default function AdminMembersPage() {
  const { getAllPlayers, deletePlayer, uploadPlayers } =
    useHttpPlayer();
  const [players, refetchPlayers] = useFetch(getAllPlayers);

  const [callCreate, createError, createFetching] =
    useCreateMember(refetchPlayers);

  const [inactive, setInactive] = useState(true);
  const [active, setActive] = useState(true);

  const filteredPlayers = useMemo(() => {
    return (players ?? [])
      .filter((player) => inactive || player.kcId)
      .filter((player) => active || !player.kcId)
      .sort((a, b) =>
        `${a.lastname} ${a.name}`.localeCompare(
          `${b.lastname} ${b.name}`,
        ),
      );
  }, [players, inactive, active]);

  if (!players) return null;

  async function onDelete(id: string) {
    await deletePlayer(id);
    refetchPlayers();
  }

  async function onUpload(file: File) {
    await uploadPlayers(file);
    refetchPlayers();
  }

  return (
    <>
      <Title size="3xl">Gestion des membres</Title>
      <Separator />

      <div className={AdminMembersPageStyle.base}>
        <section className="flex-1 max-w-full sm:border border-black/10 sm:p-6 rounded-2xl sm:max-w-[700px]">
          <Title size="2xl">
            Membres du club ({filteredPlayers.length})
          </Title>

          <div className={AdminMembersPageStyle.filters}>
            <InputCheckbox
              checked={inactive}
              onChange={setInactive}
              children="Inactif.ve"
            />

            <InputCheckbox
              checked={active}
              onChange={setActive}
              children="Actif.ve"
            />
          </div>

          <div className={AdminMembersPageStyle.list}>
            {filteredPlayers.map((player, i) => (
              <MemberRow
                onDelete={onDelete}
                key={i}
                member={player}
                alt={i % 2 == 0}
              />
            ))}

            {filteredPlayers.length === 0 && (
              <Title subtitle>
                Aucun membre ne correspond aux critères de recherche
              </Title>
            )}
          </div>
        </section>

        <div className="w-full sm:w-[380px] flex flex-col gap-8 border border-black/10 p-6 rounded-2xl shrink-0">
          <section>
            <Title size="2xl">Ajouter un.e membre</Title>
            <FormMember
              onSubmit={callCreate}
              error={createError}
              loading={createFetching}
            />
          </section>

          <section>
            <Title size="2xl">Importer des membres</Title>
            <Title subtitle>
              Fichier .csv au format NOM,Prénom,licence
            </Title>
            <FormMembersUpload onSubmit={onUpload} />
          </section>
        </div>
      </div>
    </>
  );
}
