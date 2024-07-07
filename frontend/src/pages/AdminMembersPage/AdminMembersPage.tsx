import { useState } from "react";

import Box from "../../components/Box/Box";
import useFetch from "../../http/useFetch";
import MemberRow from "./MemberRow/MemberRow";
import FormMember from "./FormMember/FormMember";
import Title from "../../components/Title/Title";
import useHttpPlayer from "../../http/useHttpPlayer";
import usePagination from "../../hooks/usePagination";
import useCreateMember from "../../hooks/useCreateMember";
import AdminMembersPageStyle from "./AdminMembersPage.style";
import Separator from "../../components/Separator/Separator";
import Pagination from "../../components/Pagination/Pagination";
import FormMembersUpload from "./FormMembersUpload/FormMembersUpload";
import InputCheckbox from "../../components/InputCheckbox/InputCheckbox";

export default function AdminMembersPage() {
  const { getAllPlayers, deletePlayer, uploadPlayers } =
    useHttpPlayer();
  const [players, refetchPlayers] = useFetch(getAllPlayers);

  const [callCreate, createError, createFetching] =
    useCreateMember(refetchPlayers);

  const [inactive, setInactive] = useState(true);
  const [active, setActive] = useState(true);

  const [paginatedPlayers, pagination] = usePagination(
    (players ?? [])
      .filter((player) => inactive || player.kcId)
      .filter((player) => active || !player.kcId)
      .sort((a, b) =>
        `${a.lastname} ${a.name}`.localeCompare(
          `${b.lastname} ${b.name}`,
        ),
      ),
  );

  if (!players) return null;

  async function onDelete(id: string) {
    await deletePlayer(id);
    await refetchPlayers();
  }

  async function onUpload(file: File) {
    await uploadPlayers(file);
    await refetchPlayers();
  }

  return (
    <>
      <Title size="3xl">Gestion des membres</Title>
      <Separator />

      <div className={AdminMembersPageStyle.base}>
        <Box
          title={`Membres du club (${players.length})`}
          mobileFull
          style="max-w-[580px] mb-10 sm:mb-0"
        >
          <section className="flex flex-col gap-4">
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
              {paginatedPlayers.map((player, i) => (
                <MemberRow
                  onDelete={onDelete}
                  key={i}
                  member={player}
                  alt={i % 2 == 0}
                />
              ))}

              {paginatedPlayers.length === 0 && (
                <Title subtitle>
                  Aucun membre ne correspond aux critères de recherche
                </Title>
              )}
            </div>

            <Pagination {...pagination} />
          </section>
        </Box>

        <Box style="max-w-[380px]">
          <section>
            <Title size="2xl">Ajouter un.e membre</Title>
            <FormMember
              onSubmit={callCreate}
              error={createError}
              loading={createFetching}
            />
          </section>

          <section className="mt-8">
            <Title size="2xl">Importer des membres</Title>
            <Title subtitle>
              Fichier .csv au format NOM;Prénom;licence
            </Title>
            <FormMembersUpload onSubmit={onUpload} />
          </section>
        </Box>
      </div>
    </>
  );
}
