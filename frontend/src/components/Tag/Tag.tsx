import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import TagStyle from "./Tag.style";

export type TagProps = {
  children: ReactNode;
  size?: "sm" | "md";
  inverted?: boolean;
  active?: boolean;
  onClick?: () => void;
};

export default function Tag({
  children,
  size = "md",
  active = false,
  inverted = false,
  onClick,
}: TagProps) {
  return (
    <div
      className={twMerge(
        TagStyle.base,
        TagStyle[size],
        inverted && TagStyle.inverted,
        active && TagStyle.active,
        onClick && TagStyle.clickable
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
