import { ReactNode } from "react";

import Title from "../Title/Title";
import { CONFIG } from "../../config";
import LogoVertical from "../LogoVertical/LogoVertical";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function SimpleLayout({ children }: AuthLayoutProps) {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-16 sm:border border-black/10 rounded-xl p-12">
        <LogoVertical withTitle />

        <div>{children}</div>

        <Title size="xl" style="mb-0 sm:mb-0">
          {CONFIG.joutonbad.clientName}
        </Title>
      </div>
    </div>
  );
}
