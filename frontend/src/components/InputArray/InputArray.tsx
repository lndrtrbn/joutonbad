import { twMerge } from "tailwind-merge";

import Button from "../Button/Button";
import InputText from "../InputText/InputText";
import InputArrayStyle from "./InputArray.style";

type Props = {
  value?: string[];
  onChange: (value: string[]) => void;
  label: string;
  addLabel: string;
  placeholder: string;
  width?: string;
};

export default function InputArray({
  value = [],
  onChange,
  label,
  addLabel,
  placeholder,
  width = "",
}: Props) {
  function onDecrement() {
    onChange([...value.slice(0, -1)]);
  }

  return (
    <div className={twMerge(InputArrayStyle.base)}>
      {label && <p className={InputArrayStyle.label}>{label}</p>}

      <div className={InputArrayStyle.inputs}>
        {value.map((val, i) => (
          <InputText
            key={i}
            value={val ?? ""}
            placeholder={placeholder.replace("{i}", `${i + 1}`)}
            width={width}
            onReset={i === value.length - 1 ? onDecrement : undefined}
            onChange={(val) => {
              onChange([
                ...value.slice(0, i),
                val,
                ...value.slice(i + 1),
              ]);
            }}
          />
        ))}
      </div>

      <Button
        type="button"
        variant="light"
        onClick={() => onChange([...value, ""])}
        disabled={value[value.length - 1] === ""}
      >
        {addLabel}
      </Button>
    </div>
  );
}
