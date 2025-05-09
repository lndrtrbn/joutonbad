import { useRouteError } from "react-router-dom";

import Link from "../../components/Link/Link";
import Alert from "../../components/Alert/Alert";
import SimpleLayout from "../../components/SimpleLayout/SimpleLayout";

export default function ErrorBoundary() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error: any = useRouteError();

  let errorMessage =
    "Une erreur inconnue est survenue. Si elle t'empêche d'utiliser l'application correctement contacte un.e responsable";

  if (error.status === 404) {
    errorMessage = "La page demandée ne semble pas exister...";
  }

  return (
    <SimpleLayout>
      <div className="flex flex-col items-center gap-4 w-72 sm:w-80">
        <Alert type="error">
          <p>{errorMessage}</p>
        </Alert>

        {error.status == 404 && (
          <Link to="/" inline>
            Page d'accueil
          </Link>
        )}
      </div>
    </SimpleLayout>
  );
}
