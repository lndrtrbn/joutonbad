import { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import MTextStyle from "./MText.style";
import { TextColor } from "../../../styles/designSystem/colors";

type TextType =
  | "title"
  | "subtitle"
  | "accent"
  | "text"
  | "small"
  | "smallBold";

export type MTextProps = {
  children: ReactNode;
  type?: TextType;
  color?: TextColor;
  style?: string;
};

type ElementProps = {
  children: ReactNode;
  className: string;
};

const ELEMENTS: { [key: string]: FC<ElementProps> } = {
  title: (props) => <h1 {...props} />,
  subtitle: (props) => <h2 {...props} />,
  accent: (props) => <h3 {...props} />,
  text: (props) => <p {...props} />,
  small: (props) => <span {...props} />,
  smallBold: (props) => <span {...props} />,
};

export default function MText({
  children,
  type = "text",
  color = "text-m-white",
  style,
}: MTextProps) {
  const Text = ELEMENTS[type];

  return (
    <Text className={twMerge(MTextStyle.size[type], color, style)}>
      {children}
    </Text>
  );
}
