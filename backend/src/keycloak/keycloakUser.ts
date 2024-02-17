export type KeycloakUser = {
  id: string;
  email: string;
  username: string;
  requiredActions?: string[];
};

export type AuthenticatedKcUser = {
  [key: string]: any;
  sub: string;
};

export type SigninPayload = {
  username: string;
  password: string;
};

export type RefreshPayload = {
  token: string;
};

export type ForgotPwdPayload = {
  email: string;
};

export type GetTokenPayload = {
  grant_type: "password" | "refresh_token";
  client_id: string;
  client_secret: string;
  username?: string;
  password?: string;
  refresh_token?: string;
};

export type KeycloakUserCreatePayload = {
  username: string;
  password: string;
  email: string;
};
