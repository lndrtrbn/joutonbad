import useLogin from "../../hooks/useLogin";
import Button from "../../components/Button/Button";
import SimpleLayout from "../../components/SimpleLayout/SimpleLayout";

export default function NoPlayerFoundPage() {
  const { logout } = useLogin();

  return (
    <SimpleLayout>
      <div className="flex flex-col gap-4 w-72 sm:w-80">
        <p className="text-center">
          Aucun joueur ou joueuse n'a été trouvé.e pour cette licence. Vérifie auprès
          d'un responsable du club que tu as bien été ajouté.e
        </p>
        <Button variant="light" onClick={logout}>
          Me déconnecter
        </Button>
      </div>
    </SimpleLayout>
  );
}
