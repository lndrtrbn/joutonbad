import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { User } from "../utils/user";
import { Player } from "../utils/player";
import { hexToRgb } from "../utils/color";
import { ContextData, ProviderProps } from "./context.type";
import { getLocalItem, setLocalItem } from "../utils/localStorage";

type Context = {
  user: ContextData<User | undefined>;
  profil: ContextData<Player | undefined>;
};

const AuthContext = createContext<Context | undefined>(undefined);

/**
 * Provider that sync user data between the app and localstorage.
 */
export function AuthProvider({ children }: ProviderProps) {
  const userState = useState<User | undefined>(getLocalItem("user"));
  const profilState = useState<Player | undefined>(
    getLocalItem("profil"),
  );

  const [user] = userState;
  const [profil] = profilState;

  useEffect(() => {
    setLocalItem("user", user);
  }, [user]);

  useEffect(() => {
    setLocalItem("profil", profil);
  }, [profil]);

  return (
    <AuthContext.Provider
      value={{
        user: userState,
        profil: profilState,
      }}
    >
      <style>{`
      :root {
        --color-main: ${hexToRgb(profil?.favoriteColor)};
      }
      `}</style>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within a AuthProvider",
    );
  }
  return {
    user: context.user[0],
    setUser: context.user[1],
    profil: context.profil[0],
    setProfil: context.profil[1],
  };
}
