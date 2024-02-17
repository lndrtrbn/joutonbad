import { twMerge } from "tailwind-merge";

import MButton from "../MButton/MButton";
import MScrollRow from "../MScrollRow/MScrollRow";

type Props<Data> = {
  items: readonly Data[];
  onChange: (val: Data) => void;
  toLabel?: (val: Data) => string;
  value?: Data;
  style?: string;
};

export default function MInputSwitch<Data>({
  items,
  onChange,
  toLabel = (v) => v as string,
  value,
  style,
}: Props<Data>) {
  return (
    <MScrollRow style={twMerge("gap-2", style)}>
      {items.map((item) => (
        <MButton
          key={toLabel(item)}
          size="small"
          variant={value === item ? "main" : "light"}
          onClick={() => onChange(item)}
        >
          {toLabel(item)}
        </MButton>
      ))}
    </MScrollRow>
  );
}
