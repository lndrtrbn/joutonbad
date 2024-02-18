import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { NavLink, NavLinkProps } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import LinkStyle from "./Link.style";

export type LinkProps = {
  children: ReactNode;
  to: string;
  icon?: IconDefinition;
  inline?: boolean;
  target?: NavLinkProps["target"];
};

export default function Link({
  children,
  to,
  icon,
  inline = false,
  target,
}: LinkProps) {
  return (
    <NavLink
      to={to}
      target={target}
      className={({ isActive }) =>
        twMerge(
          LinkStyle.base,
          LinkStyle.hover,
          !inline && LinkStyle.notInline,
          inline && LinkStyle.inline,
          isActive && LinkStyle.active,
        )
      }
    >
      {icon && (
        <FontAwesomeIcon className={LinkStyle.icon} icon={icon} />
      )}
      {children}
    </NavLink>
  );
}
