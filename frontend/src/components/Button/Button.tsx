import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import ButtonStyle from "./Button.style";

export type ButtonProps = {
  children: ReactNode;
  active?: boolean;
  disabled?: boolean;
  variant?: "solid" | "light" | "link" | "inline" | "icon";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  style?: string;
};

export default function Button({
  children,
  active = false,
  disabled = false,
  variant = "solid",
  onClick,
  type,
  style = "",
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        ButtonStyle[variant].base,
        ButtonStyle[variant].hover,
        active && ButtonStyle[variant].active,
        disabled && ButtonStyle.disabled,
        style
      )}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}
