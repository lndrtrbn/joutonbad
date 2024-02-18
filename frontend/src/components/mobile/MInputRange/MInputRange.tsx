import { twMerge } from "tailwind-merge";

import MButton from "../MButton/MButton";
import MScrollRow from "../MScrollRow/MScrollRow";
import MInputRangeStyle from "./MInputRange.style";

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
  const min = value ? items.indexOf(value[0]) : 0;
  const max = value ? items.indexOf(value[1]) : items.length;

  function inRange(index: number) {
    return index >= min && index <= max;
  }

  function changeRange(index: number) {
    let newMin = min;
    let newMax = max;

    if (index < min) {
      newMin = index;
    } else if (index > max) {
      newMax = index;
    } else if (index - min < max - index) {
      newMin = index;
    } else {
      newMax = index;
    }
    onChange([items[newMin], items[newMax]]);
  }

  return (
    <MScrollRow style={twMerge("gap-2", style)}>
      {items.map((item, i) => (
        <MButton
          key={toLabel(item)}
          size="small"
          variant={inRange(i) ? "main" : "light"}
          style={twMerge(
            inRange(i) && MInputRangeStyle.inRange,
            i === min && MInputRangeStyle.startRange,
            i === max && MInputRangeStyle.endRange,
          )}
          onClick={() => changeRange(i)}
        >
          {toLabel(item)}
        </MButton>
      ))}
    </MScrollRow>
  );
}
