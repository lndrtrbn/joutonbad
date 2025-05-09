import useLogin from "../../hooks/useLogin";
import Button from "../../components/Button/Button";
import SimpleLayout from "../../components/SimpleLayout/SimpleLayout";

export default function ConnectPage() {
  const { login, signup } = useLogin();

  return (
    <SimpleLayout>
      <div className="flex flex-col gap-4 w-72 sm:w-80">
        <p className="text-center">
          Joutonbad est une application permettant de centraliser les inscriptions
          aux tournois des joueurs et joueuses d'un même club de Badminton
        </p>

        <Button onClick={login}>Me connecter</Button>
        <Button variant="light" onClick={signup}>
          Créer un compte
        </Button>
      </div>
    </SimpleLayout>
  );
}
