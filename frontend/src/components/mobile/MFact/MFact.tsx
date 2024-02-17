import { twMerge } from "tailwind-merge";

import MText from "../MText/MText";
import MContainer from "../MContainer/MContainer";

type Props = {
  label: string;
  value: number;
  style?: string;
};

export default function MFact({ label, value, style }: Props) {
  return (
    <MContainer style={twMerge("items-end gap-2", style)}>
      <MText type="subtitle" color="text-m-main">
        {value}
      </MText>
      <MText type="text" color="text-m-moon50" style="mb-1">
        {label}
      </MText>
    </MContainer>
  );
}
