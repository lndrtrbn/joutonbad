import { ChangeEvent, useRef } from "react";
import { twMerge } from "tailwind-merge";

import MText from "../MText/MText";
import MInputColorStyle from "./MInputColor.style";

type Props = {
  value: string;
  label: string;
  onChange: (value?: string) => void;
  style?: string;
  defaultValue?: string;
};

export default function MInputColor({
  value,
  label,
  onChange,
  style,
  defaultValue,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  function focus() {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }

  function handleChanges(event: ChangeEvent<HTMLInputElement>) {
    onChange?.(event.target.value);
  }

  function reset() {
    onChange?.(defaultValue);
  }

  return (
    <div className={twMerge(MInputColorStyle.base, style)}>
      <div className={MInputColorStyle.preview}>
        <input
          ref={inputRef}
          className={MInputColorStyle.input}
          type="color"
          value={value}
          onChange={handleChanges}
        />
      </div>

      <div className={MInputColorStyle.labels}>
        <MText
          type="small"
          color="text-m-moonlight60"
          onClick={focus}
        >
          {label}
        </MText>
        {defaultValue && defaultValue !== value && (
          <MText
            type="small"
            color="text-m-moonlight20"
            onClick={reset}
          >
            Remettre la couleur par default
          </MText>
        )}
      </div>
    </div>
  );
}
