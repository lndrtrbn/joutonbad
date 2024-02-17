import { useState } from "react";

import Button from "../Button/Button";
import InputLabel from "../InputLabel/InputLabel";
import InputLabelsStyle from "./InputLabels.style";

type Props = {
  value?: [string, string][];
  onChange: (value: [string, string][]) => void;
  label: string;
  addLabel: string;
  namePlaceholder: string;
  valuePlaceholder: string;
};

export default function InputLabels({
  value = [],
  onChange,
  label,
  addLabel,
  namePlaceholder,
  valuePlaceholder,
}: Props) {
  const [qty, setQty] = useState<number[]>(value.map(() => 0));

  return (
    <div className={InputLabelsStyle.base}>
      {label && <p className={InputLabelsStyle.label}>{label}</p>}

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
          />
        ))}
      </div>

      <Button
        type="button"
        variant="light"
        onClick={() => setQty((val) => [...val, 0])}
      >
        {addLabel}
      </Button>
    </div>
  );
}
