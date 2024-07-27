import { useEffect, useState } from "react";

import useTimeout from "../../../hooks/useTimeout";
import Alert from "../../../components/Alert/Alert";
import Title from "../../../components/Title/Title";
import Button from "../../../components/Button/Button";
import { APIErrorMessage } from "../../../utils/error";
import useExportToGoogle from "../../../http/useHttpGoogle";

export default function ExportData() {
  const { mutateAsync, isPending, isSuccess, error } =
    useExportToGoogle();

  const [errorMsg, setErrorMsg] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);

  const [run, clear] = useTimeout(() => setShowFeedback(false), 5000);

  function onExport() {
    clear();
    mutateAsync();
  }

  useEffect(() => {
    if (error || isSuccess) {
      setShowFeedback(true);
      run();
    }
  }, [error, isSuccess, run]);

  useEffect(() => {
    if (!error) {
      setErrorMsg("");
    } else if (error?.message === APIErrorMessage.CANNOT_EXPORT) {
      setErrorMsg(
        "Une erreur est survenue lors de la tentative d'export vers Google Drive. Le document n'a pas pu être mis à jour",
      );
    } else {
      setErrorMsg(
        "Erreur inconnue lors de l'export. Le document n'a pas pu être mis à jour",
      );
    }
  }, [error]);

  return (
    <>
      <Title subtitle>
        Exporter les données des membres, tournois et inscriptions
        vers Google Sheet
      </Title>

      <Button onClick={onExport} disabled={isPending} style="w-full">
        Exporter
      </Button>

      {showFeedback && (
        <div className="mt-4 w-96">
          {errorMsg && <Alert type="error">{errorMsg}</Alert>}
          {isPending && (
            <Alert type="success">
              L'export de données a bien été effectué
            </Alert>
          )}
        </div>
      )}
    </>
  );
}
