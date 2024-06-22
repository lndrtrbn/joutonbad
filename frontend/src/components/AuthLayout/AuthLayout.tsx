import { ReactNode } from "react";

import Title from "../Title/Title";
import style from "./AuthLayout.style";
import LogoVertical from "../LogoVertical/LogoVertical";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className={style.base}>
      <LogoVertical />

      <div className={style.container}>{children}</div>

      <div className={style.botton}>
        <Title size="xl" style="mb-0 sm:mb-0">
          REC Badminton
        </Title>
      </div>
    </div>
  );
}
