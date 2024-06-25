import { useState } from "react";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Button from "../Button/Button";
import InputLabel from "../InputLabel/InputLabel";
import InputLabelsStyle from "./InputLabels.style";

type Props = {
  value?: [string, string][];
  onChange: (value: [string, string][]) => void;
  label: string;
  namePlaceholder: string;
  valuePlaceholder: string;
};

export default function InputLabels({
  value = [],
  onChange,
  label,
  namePlaceholder,
  valuePlaceholder,
}: Props) {
  const [qty, setQty] = useState<number[]>(value.map(() => 0));

  return (
    <div className={InputLabelsStyle.base}>
      <div className="flex items-center gap-4">
        <p className={InputLabelsStyle.label}>{label}</p>
        <Button
          type="button"
          variant="icon"
          onClick={() => setQty((val) => [...val, 0])}
          disabled={value.length < qty.length}
        >
          <FontAwesomeIcon icon={faAdd} />
        </Button>
      </div>

      <div className={InputLabelsStyle.inputs}>
        {qty.map((_, i) => (
          <InputLabel
            key={i}
            value={value[i]}
            namePlaceholder={namePlaceholder}
            valuePlaceholder={valuePlaceholder}
            onChange={(val) =>
              onChange([
                ...value.slice(0, i),
                val,
                ...value.slice(i + 1),
              ])
            }
            onDelete={() => {
              setQty((val) => val.slice(0, val.length - 1));
              onChange([...value.slice(0, i), ...value.slice(i + 1)]);
            }}
          />
        ))}
      </div>
    </div>
  );
}
