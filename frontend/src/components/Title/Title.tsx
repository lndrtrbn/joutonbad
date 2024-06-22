import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import TitleStyle from "./Title.style";

export type TitleProps = {
  children: ReactNode;
  size?: "md" | "xl" | "2xl" | "3xl";
  subtitle?: boolean;
  style?: string;
};

export default function Title({
  children,
  size = "md",
  subtitle = false,
  style = "",
}: TitleProps) {
  return (
    <div
      className={twMerge(
        TitleStyle.base,
        TitleStyle[size],
        subtitle && TitleStyle.subtitle,
        style,
      )}
    >
      {children}
    </div>
  );
}
