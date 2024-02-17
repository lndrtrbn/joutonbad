import { useMemo, useState } from "react";

import FormMember, {
  FormMemberInputs,
} from "./FormMember/FormMember";
import useFetch from "../../../http/useFetch";
import MemberRow from "./MemberRow/MemberRow";
import { APIError } from "../../../utils/error";
import Title from "../../../components/Title/Title";
import useHttpPlayer from "../../../http/useHttpPlayer";
import AdminMembersPageStyle from "./AdminMembersPage.style";
import FormMembersUpload from "./FormMembersUpload/FormMembersUpload";
import InputCheckbox from "../../../components/InputCheckbox/InputCheckbox";

export default function AdminMembersPage() {
  const {
    getAllPlayers,
    getAdminPlayers,
    createPlayer,
    deletePlayer,
    uploadPlayers,
  } = useHttpPlayer();
  const [players, refetchPlayers] = useFetch(getAllPlayers);
  const [admins] = useFetch(getAdminPlayers);

  const [submitError, setError] = useState<APIError>();

  const [inactive, setInactive] = useState(true);
  const [active, setActive] = useState(true);
  const [onlyAdmins, setOnlyAdmins] = useState(false);

  const filteredPlayers = useMemo(() => {
    return (players ?? [])
      .filter((player) => inactive || player.kcId)
      .filter((player) => active || !player.kcId)
      .filter(
        (player) =>
          !onlyAdmins ||
          admins?.find((admin) => admin.id === player.id)
      );
  }, [players, inactive, active, admins, onlyAdmins]);

  if (!players) return null;

  async function onCreate(data: FormMemberInputs) {
    try {
      setError(undefined);
      await createPlayer(data);
      refetchPlayers();
    } catch (error) {
      error instanceof APIError && setError(error);
    }
  }

  async function onDelete(id: string) {
    await deletePlayer(id);
    refetchPlayers();
  }

  async function onUpload(file: File) {
    await uploadPlayers(file);
    refetchPlayers();
  }

  return (
    <div className={AdminMembersPageStyle.base}>
      <section>
        <Title size="2xl">Ajouter un.e membre</Title>
        <FormMember onSubmit={onCreate} error={submitError} />
      </section>

      <section>
        <Title size="2xl">Importer des membres</Title>
        <Title subtitle>
          Depuis un fichier .csv au format NOM,Prénom,licence
        </Title>
        <FormMembersUpload onSubmit={onUpload} />
      </section>

      <section>
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

          <InputCheckbox
            checked={onlyAdmins}
            onChange={setOnlyAdmins}
            children="Uniquement Admins"
          />
        </div>

        <div className={AdminMembersPageStyle.list}>
          {filteredPlayers
            .sort((a, b) =>
              `${a.lastname} ${a.name}`.localeCompare(
                `${b.lastname} ${b.name}`
              )
            )
            .map((player, i) => (
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
    </div>
  );
}
