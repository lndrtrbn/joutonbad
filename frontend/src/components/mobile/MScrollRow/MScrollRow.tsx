import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import MScrollRowStyle from "./MScrollRow.style";

type Props = {
  children: ReactNode;
  style?: string;
};

export default function MScrollRow({ children, style }: Props) {
  return (
    <div className={twMerge(MScrollRowStyle.base, style)}>
      {children}
    </div>
  );
}
