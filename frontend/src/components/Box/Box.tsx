import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import Title from "../Title/Title";

type Props = {
  title?: string;
  children: ReactNode;
  mobileFull?: boolean;
  style?: string;
};

export default function Box({
  title,
  children,
  mobileFull = false,
  style = "",
}: Props) {
  const normalStyle = "border p-6";
  const mobileStyle = "sm:border sm:p-6";

  return (
    <section
      className={twMerge(
        "border-black/10 rounded-2xl",
        mobileFull ? mobileStyle : normalStyle,
        style,
      )}
    >
      {title && <Title size="2xl">{title}</Title>}
      {children}
    </section>
  );
}
