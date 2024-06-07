import axios, { AxiosError } from "axios";
import { GrantProperties } from "keycloak-connect";
import { Injectable, Logger } from "@nestjs/common";

import {
  GetTokenPayload,
  KeycloakUserCreatePayload,
} from "../keycloak/keycloakUser";
import { CONFIG } from "src/config";
import { trimLicense } from "src/utils/license";
import { PlayerService } from "src/player/player.service";
import { authorization, urlEncoded } from "src/utils/headers";
import { KeycloakService } from "src/keycloak/keycloak.service";
import { UnauthorizedException } from "src/exceptions/unauthorized.exception";
import { InternalErrorException } from "src/exceptions/internalError.exception";
import { AlreadyExistingUserException } from "src/exceptions/alreadyExistingUser.exception";
import { PlayerAlreadyLinkedException } from "src/exceptions/playerAlreadyLinked.exception";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private playerService: PlayerService,
    private keycloakService: KeycloakService,
  ) {}

  private async executeActions(
    userId: string,
    actions: string[],
  ): Promise<void> {
    const { access_token } = await this.keycloakService.getApiToken(
      CONFIG.kcApiUser,
      CONFIG.kcApiPwd,
    );
    return (
      await axios.put(
        `${CONFIG.kcUrl}/admin/realms/${CONFIG.kcRealm}/users/${userId}/execute-actions-email`,
        actions,
        {
          headers: authorization(access_token),
        },
      )
    ).data;
  }

  /**
   * Get an access token (and additionnal token data) for a user.
   *
   * @param refreshToken The refresh topken to get new access token.
   * @returns All data about the token for this user.
   */
  async refreshApiToken(refreshToken: string) {
    const URL = `${CONFIG.kcUrl}/realms/${CONFIG.kcRealm}/protocol/openid-connect/token`;
    const payload: GetTokenPayload = {
      grant_type: "refresh_token",
      client_id: CONFIG.kcClientId,
      client_secret: CONFIG.kcClientSecret,
      refresh_token: refreshToken,
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
      this.logger.error(`[refreshApiToken] ${JSON.stringify(error)}`);

      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          throw new UnauthorizedException();
        }
      }
      throw new InternalErrorException();
    }
  }

  /**
   * Call keycloak action to update the password of a user.
   *
   * @param userEmail The email of the user to execute actions.
   * @param actions Actions to execute.
   */
  async executeUserActions(
    userEmail: string,
    actions: string[],
  ): Promise<void> {
    const user = (await this.keycloakService.getUsers()).find(
      (u) => u.email == userEmail,
    );
    if (user) {
      await this.executeActions(user.id, actions);
    }
  }

  /**
   * Call keycloak to get a token.
   *
   * @param username The username of the user who wants a token.
   * @param password The password of the usre who wants a token.
   */
  async signin(
    username: string,
    password: string,
  ): Promise<GrantProperties> {
    return this.keycloakService.getApiToken(username, password);
  }

  /**
   * Create a new keycloak user.
   *
   * @param payload The data of the user to create.
   * @returns 201 if success.
   */
  async createUser(
    payload: KeycloakUserCreatePayload,
  ): Promise<void> {
    const license = trimLicense(payload.username);
    this.logger.log(`[createUser] With: ${license}`);

    const player = await this.playerService.getOneWhere({
      license,
    });
    if (player.kcId) {
      throw new PlayerAlreadyLinkedException();
    }

    const URL = `${CONFIG.kcUrl}/admin/realms/${CONFIG.kcRealm}/users`;
    const { access_token } = await this.keycloakService.getApiToken(
      CONFIG.kcApiUser,
      CONFIG.kcApiPwd,
    );

    if (!access_token) {
      this.logger.error(`[createUser] No API token`);
      throw new InternalErrorException();
    }

    const keycloakPayload = {
      username: license,
      email: payload.email,
      enabled: true,
      credentials: [
        {
          type: "password",
          value: payload.password,
          temporary: false,
        },
      ],
    };

    try {
      await axios.post(URL, keycloakPayload, {
        headers: authorization(access_token),
      });

      const user = (await this.keycloakService.getUsers()).find(
        (u) => u.username == license,
      );
      await this.executeActions(user.id, user.requiredActions);

      if (user) {
        await this.playerService.link(license, user);
      }
    } catch (error) {
      this.logger.error(JSON.stringify(error, undefined, 2));
      this.logger.error(`[createUser] ${error}`);

      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          throw new AlreadyExistingUserException();
        }
      }
      throw new InternalErrorException();
    }
  }
}
