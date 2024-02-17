import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import TagListStyle from "./TagList.style";

export type TagListProps = {
  children?: ReactNode;
};

export default function TagList({ children }: TagListProps) {
  return <div className={twMerge(TagListStyle.base)}>{children}</div>;
}
