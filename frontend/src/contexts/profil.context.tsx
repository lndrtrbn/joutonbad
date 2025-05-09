import { createContext, useContext, useEffect, useState } from "react";

import { Player } from "../utils/player";
import { hexToRgb } from "../utils/color";
import { ContextData, ProviderProps } from "./context.type";
import { getLocalItem, setLocalItem } from "../utils/localStorage";

type Context = {
  profil: ContextData<Player | undefined>;
};

const AuthContext = createContext<Context | undefined>(undefined);

/**
 * Provider that sync user data between the app and localstorage.
 */
export function ProfilProvider({ children }: ProviderProps) {
  const profilState = useState<Player | undefined>(getLocalItem("profil"));
  const [profil] = profilState;

  useEffect(() => {
    setLocalItem("profil", profil);
  }, [profil]);

  return (
    <AuthContext.Provider value={{ profil: profilState }}>
      <style>{`
      :root {
        --color-main: ${hexToRgb(undefined)};
      }
      `}</style>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProfilContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return {
    profil: context.profil[0],
    setProfil: context.profil[1],
  };
}
