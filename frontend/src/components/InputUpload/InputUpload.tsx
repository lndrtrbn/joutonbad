import { ChangeEvent, InputHTMLAttributes, useRef } from "react";

import Button from "../Button/Button";

type Props = {
  label: string;
  onChange: InputHTMLAttributes<HTMLInputElement>["onChange"];
  accept?: InputHTMLAttributes<HTMLInputElement>["accept"];
  disabled?: InputHTMLAttributes<HTMLInputElement>["disabled"];
};

export default function InputUpload({ label, accept, onChange, disabled }: Props) {
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
        className="w-0 h-0 opacity-0"
        disabled={disabled}
      />

      <Button
        onClick={() => inputRef.current?.click()}
        disabled={disabled}
        style="w-full"
      >
        {label}
      </Button>
    </div>
  );
}
