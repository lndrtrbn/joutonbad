import Box from "../../components/Box/Box";
import FormMember from "./FormMember/FormMember";
import Title from "../../components/Title/Title";
import MembersList from "./MembersList/MembersList";
import { useQueryPlayers } from "../../http/useHttpPlayer";
import Separator from "../../components/Separator/Separator";
import FormMembersUpload from "./FormMembersUpload/FormMembersUpload";

export default function AdminMembersPage() {
  const { data: players } = useQueryPlayers();

  if (!players) return null;

  return (
    <>
      <Title size="3xl">Gestion des membres</Title>
      <Separator />

      <div className="sm:flex flex-row flex-wrap gap-10 items-start">
        <Box
          title={`Membres du club (${players.length})`}
          mobileFull
          style="max-w-[580px] mb-10 sm:mb-0"
        >
          <MembersList members={players} />
        </Box>

        <Box style="max-w-[380px]">
          <section>
            <Title size="2xl">Ajouter un.e membre</Title>
            <FormMember />
          </section>

          <section className="mt-8">
            <Title size="2xl">Importer des membres</Title>
            <FormMembersUpload />
          </section>
        </Box>
      </div>
    </>
  );
}
