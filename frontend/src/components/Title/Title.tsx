import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import TitleStyle from "./Title.style";

export type TitleProps = {
  children: ReactNode;
  size?: "md" | "xl" | "2xl" | "3xl";
  subtitle?: boolean;
};

export default function Title({
  children,
  size = "md",
  subtitle = false,
}: TitleProps) {
  return (
    <div
      className={twMerge(
        TitleStyle.base,
        TitleStyle[size],
        subtitle && TitleStyle.subtitle,
      )}
    >
      {children}
    </div>
  );
}
