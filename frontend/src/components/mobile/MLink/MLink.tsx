import { ReactNode } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";

import MLinkStyle from "./MLink.style";
import MText, { MTextProps } from "../MText/MText";

type Props = {
  children: ReactNode;
  to: string;
  target?: NavLinkProps["target"];
  alt?: boolean;
  type?: MTextProps["type"];
};

export default function MLink({
  children,
  to,
  target,
  alt = false,
  type,
}: Props) {
  return (
    <NavLink to={to} target={target} className={MLinkStyle.base}>
      <MText
        type={type}
        color={!alt ? "text-m-main" : "text-m-white"}
      >
        {children}
      </MText>
    </NavLink>
  );
}
