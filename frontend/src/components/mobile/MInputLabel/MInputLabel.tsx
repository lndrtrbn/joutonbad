import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import MText from "../MText/MText";
import MInputLabelStyle from "./MInputLabel.style";

type Props = {
  name: string;
  children?: ReactNode;
  style?: string;
};

export default function MInputLabel({
  name,
  children,
  style,
}: Props) {
  return (
    <label className={twMerge(MInputLabelStyle.base, style)}>
      <MText type="small" color="text-m-moonlight/60" style="mb-4">
        {name}
      </MText>
      {children}
    </label>
  );
}
