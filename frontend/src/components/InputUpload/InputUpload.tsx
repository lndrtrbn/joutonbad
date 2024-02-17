import { ChangeEvent, InputHTMLAttributes, useRef } from "react";

import Button from "../Button/Button";

type Props = {
  label: string;
  accept?: InputHTMLAttributes<HTMLInputElement>["accept"];
  onChange?: InputHTMLAttributes<HTMLInputElement>["onChange"];
};

export default function InputUpload({
  label,
  accept,
  onChange,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  function change(event: ChangeEvent<HTMLInputElement>) {
    onChange?.(event);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        id="actual-btn"
        hidden
        accept={accept}
        onChange={change}
      />

      <Button onClick={() => inputRef.current?.click()}>
        {label}
      </Button>
    </div>
  );
}
