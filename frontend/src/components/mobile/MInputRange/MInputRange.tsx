import { twMerge } from "tailwind-merge";

import MButton from "../MButton/MButton";
import MScrollRow from "../MScrollRow/MScrollRow";
import MInputRangeStyle from "./MInputRange.style";
import { useState } from "react";

type Props<Data> = {
  items: readonly Data[];
  onChange: (val: [Data, Data]) => void;
  toLabel?: (val: Data) => string;
  value?: [Data, Data];
  style?: string;
};

export default function MInputRange<Data>({
  items,
  onChange,
  toLabel = (v) => v as string,
  value,
  style,
}: Props<Data>) {
  const [extremity, setExtremity] = useState<
    "min" | "max" | undefined
  >();

  const min = value ? items.indexOf(value[0]) : 0;
  const max = value ? items.indexOf(value[1]) : items.length;

  function inRange(index: number) {
    return index >= min && index <= max;
  }

  function changeRange(index: number) {
    if (!extremity) {
      if (index === min) setExtremity("min");
      if (index === max) setExtremity("max");
      return;
    }

    if (extremity === "min" && index <= max) {
      onChange([items[index], items[max]]);
    } else if (extremity === "max" && index >= min) {
      onChange([items[min], items[index]]);
    }
    setExtremity(undefined);
  }

  return (
    <MScrollRow style={twMerge("gap-2", style)}>
      {items.map((item, i) => (
        <MButton
          key={toLabel(item)}
          size="small"
          variant={inRange(i) ? "main" : "white"}
          style={twMerge(
            inRange(i) && MInputRangeStyle.inRange,
            i === min && MInputRangeStyle.startRange,
            i === max && MInputRangeStyle.endRange,
            extremity === "min" &&
              i === min &&
              MInputRangeStyle.active,
            extremity === "max" &&
              i === max &&
              MInputRangeStyle.active,
          )}
          onClick={() => changeRange(i)}
        >
          {toLabel(item)}
        </MButton>
      ))}
    </MScrollRow>
  );
}
