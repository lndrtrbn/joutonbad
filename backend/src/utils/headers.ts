import KeycloakConnect from "keycloak-connect";

export function urlEncoded() {
  return {
    "content-type": "application/x-www-form-urlencoded",
  };
}

export function authorization(token: string | KeycloakConnect.Token) {
  return {
    Authorization: `Bearer ${token}`,
  };
}
