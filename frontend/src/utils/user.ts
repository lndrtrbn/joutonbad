import * as jose from "jose";

export type KcUser = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  refresh_expires_in: number;
};

export type User = {
  accessToken: string;
  refreshToken: string;
  license: string;
  roles: string[];
};

export function kcUserToUser(kcUser: KcUser | undefined): User | undefined {
  if (!kcUser) return undefined;

  const decoded = jose.decodeJwt(kcUser.access_token);

  return {
    accessToken: kcUser.access_token,
    refreshToken: kcUser.refresh_token,
    license: decoded.preferred_username as string,
    roles: (decoded.realm_access as any).roles as string[],
  };
}

export function isEditor(user: User): boolean {
  return user.roles.includes(import.meta.env.VITE_KC_EDITOR_ROLE);
}
