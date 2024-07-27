import { twMerge } from "tailwind-merge";
import { ChangeEvent, MouseEvent } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Button from "../Button/Button";
import InputTextStyle from "./InputText.style";

export type InputTextProps = {
  value: string;
  onChange?: (value: string) => void;
  onReset?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  error?: string;
  inError?: boolean;
  style?: string;
  width?: string;
  disabled?: boolean;
  type?: string;
  readonly?: boolean;
  label?: string;
};

export default function InputText({
  value,
  onChange,
  onReset,
  onBlur,
  placeholder,
  error,
  inError = false,
  style = "",
  width = "",
  disabled = false,
  type = "text",
  readonly = false,
  label,
}: InputTextProps) {
  function handleChanges(event: ChangeEvent<HTMLInputElement>) {
    onChange?.(event.target.value);
  }

  function handleReset(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    onReset?.();
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
            disabled && InputTextStyle.disabled,
            !!label && InputTextStyle.withLabel,
          )}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChanges}
          onBlur={onBlur}
          disabled={disabled}
          readOnly={readonly}
        />
        {label && <label className={InputTextStyle.label}>{label}</label>}
        {onReset && value && (
          <Button
            style={InputTextStyle.resetBtn}
            variant="inline"
            onClick={handleReset}
            type="button"
          >
            <FontAwesomeIcon size="lg" icon={faClose} />
          </Button>
        )}
      </div>
      {inError && error && <span className={InputTextStyle.errorText}>{error}</span>}
    </div>
  );
}
