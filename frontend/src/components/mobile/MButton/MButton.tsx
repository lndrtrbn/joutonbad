import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import MButtonStyle from "./MButton.style";

export type MButtonProps = {
  children?: ReactNode;
  onClick?: () => void;
  variant?: "main" | "white" | "light";
  size?: "large" | "small";
  style?: string;
  disabled?: boolean;
};

export default function MButton({
  children,
  onClick,
  variant = "main",
  size = "large",
  style,
  disabled = false,
}: MButtonProps) {
  return (
    <button
      className={twMerge(
        MButtonStyle.base,
        MButtonStyle[variant],
        MButtonStyle[size],
        disabled && MButtonStyle.disabled,
        style,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <span>{children}</span>
    </button>
  );
}
