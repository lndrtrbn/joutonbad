import { ChangeEvent } from "react";

import Title from "../../../components/Title/Title";
import { useUploadPlayers } from "../../../http/useHttpPlayer";
import InputUpload from "../../../components/InputUpload/InputUpload";

export default function FormMembersUpload() {
  const { mutateAsync, isPending } = useUploadPlayers();

  function onUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.item(0);
    if (file) mutateAsync(file);
  }

  return (
    <>
      <Title subtitle>
        Fichier .csv au format NOM;Prénom;licence
      </Title>
      <InputUpload
        label="Importer"
        accept=".csv"
        onChange={onUpload}
        disabled={isPending}
      />
    </>
  );
}
