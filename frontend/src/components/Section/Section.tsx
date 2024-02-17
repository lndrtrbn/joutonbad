import { ReactNode } from "react";

import SectionStyle from "./Section.style";

export type SectionProps = {
  children?: ReactNode;
};

export default function Section({ children }: SectionProps) {
  return <div className={SectionStyle.base}>{children}</div>;
}
