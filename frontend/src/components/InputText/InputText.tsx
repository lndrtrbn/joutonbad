import { ChangeEvent } from "react";
import { twMerge } from "tailwind-merge";

import InputTextStyle from "./InputText.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";

export type InputTextProps = {
  value: string;
  onChange?: (value: string) => void;
  onReset?: () => void;
  placeholder?: string;
  error?: string;
  inError?: boolean;
  style?: string;
  width?: string;
  disabled?: boolean;
  type?: string;
  readonly?: boolean;
};

export default function InputText({
  value,
  onChange,
  onReset,
  placeholder,
  error,
  inError = false,
  style = "",
  width = "",
  disabled = false,
  type = "text",
  readonly = false,
}: InputTextProps) {
  function handleChanges(event: ChangeEvent<HTMLInputElement>) {
    onChange?.(event.target.value);
  }

  return (
    <div className={twMerge(InputTextStyle.base, width)}>
      <div className={InputTextStyle.container}>
        <input
          className={twMerge(
            InputTextStyle.input,
            InputTextStyle.colors,
            style,
            inError && InputTextStyle.error,
            disabled && InputTextStyle.disabled
          )}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChanges}
          disabled={disabled}
          readOnly={readonly}
        />
        {onReset && (
          <Button
            style={InputTextStyle.resetBtn}
            variant="inline"
            onClick={onReset}
          >
            <FontAwesomeIcon size="lg" icon={faClose} />
          </Button>
        )}
      </div>
      {inError && (
        <span className={InputTextStyle.errorText}>{error}</span>
      )}
    </div>
  );
}
