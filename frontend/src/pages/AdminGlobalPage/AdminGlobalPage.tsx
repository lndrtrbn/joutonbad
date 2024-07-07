import { useEffect, useState } from "react";

import useTimeout from "../../hooks/useTimeout";
import Alert from "../../components/Alert/Alert";
import Title from "../../components/Title/Title";
import useLazyFetch from "../../http/useLazyFetch";
import Button from "../../components/Button/Button";
import { APIErrorMessage } from "../../utils/error";
import useHttpGoogle from "../../http/useHttpGoogle";
import Separator from "../../components/Separator/Separator";

export default function AdminGlobalPage() {
  const { exportData } = useHttpGoogle();
  const [callExport, , error, fetching, fetched] = useLazyFetch<
    void,
    void
  >(exportData);

  const [errorMsg, setErrorMsg] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);

  const [run, clear] = useTimeout(() => setShowFeedback(false), 5000);

  function onExport() {
    clear();
    callExport();
  }

  useEffect(() => {
    if (error || fetched) {
      setShowFeedback(true);
      run();
    }
  }, [error, fetched, run]);

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
      <Title size="3xl">Paramètres globaux</Title>
      <Separator />

      <div className="max-w-full border border-black/10 p-6 rounded-2xl sm:max-w-[500px]">
        <Title size="2xl">Export de données</Title>
        <Title subtitle>
          Exporter les données des membres, tournois et inscriptions
          vers Google Sheet
        </Title>

        <Button onClick={onExport} disabled={fetching} style="w-full">
          Exporter
        </Button>

        {showFeedback && (
          <div className="mt-4 w-96">
            {errorMsg && <Alert type="error">{errorMsg}</Alert>}
            {fetched && (
              <Alert type="success">
                L'export de données a bien été effectué
              </Alert>
            )}
          </div>
        )}
      </div>
    </>
  );
}
