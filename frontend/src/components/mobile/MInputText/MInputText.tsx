import { twMerge } from "tailwind-merge";
import { ChangeEvent, InputHTMLAttributes } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import MIcon from "../MIcon/MIcon";
import MInputTextStyle from "./MInputText.style";

type Props = {
  value: string;
  onChange?: (value: string) => void;
  onReset?: () => void;
  placeholder?: string;
  style?: string;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  readonly?: boolean;
};

export default function MInputText({
  value,
  onChange,
  onReset,
  placeholder,
  style = "",
  type = "text",
  readonly = false,
}: Props) {
  function handleChanges(event: ChangeEvent<HTMLInputElement>) {
    onChange?.(event.target.value);
  }

  return (
    <div className={MInputTextStyle.base}>
      <input
        className={twMerge(
          MInputTextStyle.input,
          MInputTextStyle.inputColors,
          style
        )}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChanges}
        readOnly={readonly}
      />
      {onReset && value && (
        <MIcon
          onClick={onReset}
          icon={faClose}
          naked
          style={MInputTextStyle.resetBtn}
        />
      )}
    </div>
  );
}
