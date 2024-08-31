import anime from "animejs";

import LogoVertical from "../LogoVertical/LogoVertical";
import { useEffect } from "react";

export default function ScreenLoader() {
  useEffect(() => {
    anime({
      targets: ".logo-pulse",
      loop: true,
      direction: "alternate",
      keyframes: [{ scale: 2 }, { scale: 0.5 }],
      rotate: 180,
      duration: 1000,
      easing: "linear",
    });
  });

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="logo-pulse">
        <LogoVertical />
      </div>
    </div>
  );
}
