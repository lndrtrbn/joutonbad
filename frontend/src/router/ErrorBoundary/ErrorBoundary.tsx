import { twMerge } from "tailwind-merge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceDizzy } from "@fortawesome/free-regular-svg-icons";

import { useRouteError } from "react-router-dom";
import ErrorBoundaryStyle from "./ErrorBoundary.style";
import MText from "../../components/mobile/MText/MText";
import MLink from "../../components/mobile/MLink/MLink";

export default function ErrorBoundary() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error: any = useRouteError();

  let errorMessage =
    "Une erreur inconnue est survenue. Si elle t'empêche d'utiliser l'application correctement contacte un.e responsable";

  if (error.status === 404) {
    errorMessage = "La page demandée ne semble pas exister...";
  }

  return (
    <div
      className={twMerge(
        ErrorBoundaryStyle.base,
        ErrorBoundaryStyle.colors,
      )}
    >
      <FontAwesomeIcon
        size="4x"
        icon={faFaceDizzy}
        className={ErrorBoundaryStyle.icon}
      />
      <div>
        {error.status && (
          <MText
            type="accent"
            color="text-m-white"
            style="text-center mb-4"
          >
            {error.status}
          </MText>
        )}
        <MText type="text" color="text-m-white" style="text-center">
          {errorMessage}
        </MText>
      </div>
      <MLink to="/">Ramène moi en lieu sûr</MLink>
    </div>
  );
}
