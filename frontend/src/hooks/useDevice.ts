import { useEffect, useState } from "react";

import { Device } from "../utils/preferences";
import { useAuthContext } from "../contexts/auth.context";

const isMobileBrowser =
  !!navigator.userAgent.match(/Android/i) ||
  !!navigator.userAgent.match(/iPhone/i) ||
  !!navigator.userAgent.match(/iPad/i);

export default function useDevice() {
  const {
    profil: [profil],
  } = useAuthContext();

  const [device, setDevice] = useState<Device>(
    isMobileBrowser && profil?.favoriteDevice === "mobile"
      ? "mobile"
      : "desktop",
  );

  useEffect(() => {
    setDevice(
      isMobileBrowser && profil?.favoriteDevice === "mobile"
        ? "mobile"
        : "desktop",
    );
  }, [profil]);

  return device;
}
