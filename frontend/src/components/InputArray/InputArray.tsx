import { twMerge } from "tailwind-merge";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Button from "../Button/Button";
import InputText from "../InputText/InputText";
import InputArrayStyle from "./InputArray.style";

type Props = {
  value?: string[];
  onChange: (value: string[]) => void;
  label: string;
  placeholder: string;
  width?: string;
};

export default function InputArray({
  value = [],
  onChange,
  label,
  placeholder,
  width = "",
}: Props) {
  function onDecrement() {
    onChange([...value.slice(0, -1)]);
  }

  return (
    <div className={twMerge(InputArrayStyle.base)}>
      <div className="flex items-center gap-4">
        <p className={InputArrayStyle.label}>{label}</p>
        <Button
          type="button"
          variant="icon"
          onClick={() => onChange([...value, ""])}
          disabled={value[value.length - 1] === ""}
        >
          <FontAwesomeIcon icon={faAdd} />
        </Button>
      </div>

      {!!value && value.length > 0 && (
        <div className={InputArrayStyle.inputs}>
          {value.map((val, i) => (
            <InputText
              key={i}
              value={val ?? ""}
              label={placeholder.replace("{i}", `${i + 1}`)}
              width={width}
              onReset={i === value.length - 1 ? onDecrement : undefined}
              onChange={(val) => {
                onChange([...value.slice(0, i), val, ...value.slice(i + 1)]);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
