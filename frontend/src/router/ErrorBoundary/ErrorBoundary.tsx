import { twMerge } from "tailwind-merge";
import { useRouteError } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceDizzy } from "@fortawesome/free-regular-svg-icons";

import Link from "../../components/Link/Link";
import Alert from "../../components/Alert/Alert";
import ErrorBoundaryStyle from "./ErrorBoundary.style";
import AuthLayout from "../../components/AuthLayout/AuthLayout";

export default function ErrorBoundary() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error: any = useRouteError();

  let errorMessage =
    "Une erreur inconnue est survenue. Si elle t'empêche d'utiliser l'application correctement contacte un.e responsable";

  if (error.status === 404) {
    errorMessage = "La page demandée ne semble pas exister...";
  }

  return (
    <AuthLayout>
      <div className={ErrorBoundaryStyle.content}>
        <FontAwesomeIcon size="2x" icon={faFaceDizzy} />

        <Alert type="error">
          {error.status}
          <p>{errorMessage}</p>
        </Alert>

        <Link to="/" inline>
          Page d'accueil
        </Link>
      </div>
    </AuthLayout>
  );
}
