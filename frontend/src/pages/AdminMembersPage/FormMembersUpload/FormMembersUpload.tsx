import { ChangeEvent } from "react";

import InputUpload from "../../../components/InputUpload/InputUpload";

type Props = {
  onSubmit: (file: File) => void;
};

export default function FormMembersUpload({ onSubmit }: Props) {
  function onUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.item(0);
    if (file) {
      onSubmit(file);
    }
  }

  return (
    <InputUpload label="Importer" accept=".csv" onChange={onUpload} />
  );
}
