import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import MTagStyle from "./MTag.style";

export type MTagProps = {
  children: ReactNode;
  variant?: "dark" | "main" | "light" | "black";
  style?: string;
};

export default function MTag({
  children,
  variant = "dark",
  style,
}: MTagProps) {
  return (
    <span
      className={twMerge(MTagStyle.base, MTagStyle[variant], style)}
    >
      {children}
    </span>
  );
}
