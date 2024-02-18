import axios, { AxiosError } from "axios";
import { GrantProperties } from "keycloak-connect";
import {
  Injectable,
  Logger,
  UnauthorizedException,
} from "@nestjs/common";

import { CONFIG } from "src/config";
import { trimLicense } from "src/utils/license";
import { authorization, urlEncoded } from "src/utils/headers";
import {
  GetTokenPayload,
  KeycloakUser,
} from "src/keycloak/keycloakUser";
import { InternalErrorException } from "src/exceptions/internalError.exception";

@Injectable()
export class KeycloakService {
  private readonly logger = new Logger(KeycloakService.name);

  /**
   * Get an access token (and additionnal token data) for a user.
   *
   * @param username The username of the user who wants a token.
   * @param password The password of the usre who wants a token.
   * @returns All data about the token for this user.
   */
  async getApiToken(
    username: string,
    password: string,
  ): Promise<GrantProperties> {
    const license = trimLicense(username);
    this.logger.log(`[getApiToken] With: ${license}`);

    const URL = `${CONFIG.kcUrl}/realms/${CONFIG.kcRealm}/protocol/openid-connect/token`;
    const payload: GetTokenPayload = {
      grant_type: "password",
      client_id: CONFIG.kcClientId,
      client_secret: CONFIG.kcClientSecret,
      username: license,
      password,
    };

    try {
      const { data } = await axios.post<GrantProperties>(
        URL,
        payload,
        {
          headers: urlEncoded(),
        },
      );
      return data;
    } catch (error) {
      this.logger.error(`[getApiToken] ${JSON.stringify(error)}`);

      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          throw new UnauthorizedException();
        }
      }
      throw new InternalErrorException();
    }
  }

  /**
   * Get the list of keycloak users.
   *
   * @returns The list of keycloak users
   */
  async getUsers(): Promise<KeycloakUser[]> {
    const { access_token } = await this.getApiToken(
      CONFIG.kcApiUser,
      CONFIG.kcApiPwd,
    );
    return (
      await axios.get(
        `${CONFIG.kcUrl}/admin/realms/${CONFIG.kcRealm}/users`,
        {
          headers: authorization(access_token),
        },
      )
    ).data;
  }

  /**
   * Get the list of keycloak users.
   *
   * @returns The list of keycloak users
   */
  async getAdminUsers(): Promise<KeycloakUser[]> {
    const { access_token } = await this.getApiToken(
      CONFIG.kcApiUser,
      CONFIG.kcApiPwd,
    );
    return (
      await axios.get(
        `${CONFIG.kcUrl}/admin/realms/${CONFIG.kcRealm}/roles/${CONFIG.kcRoleEditor}/users`,
        {
          headers: authorization(access_token),
        },
      )
    ).data;
  }
}
