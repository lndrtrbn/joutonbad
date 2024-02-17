import { ChangeEvent } from "react";

import FormMembersUploadStyle from "./FormMembersUpload.style";
import InputUpload from "../../../../components/InputUpload/InputUpload";

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
    <div className={FormMembersUploadStyle.base}>
      <InputUpload
        label="Importer"
        accept=".csv"
        onChange={onUpload}
      />
    </div>
  );
}
