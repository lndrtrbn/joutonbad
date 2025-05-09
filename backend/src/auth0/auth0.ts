export type Auth0Token = {
  access_token: string;
  scope: string;
};

export type Auth0RoleUser = {
  user_id: string;
  email: string;
  name: string;
};
