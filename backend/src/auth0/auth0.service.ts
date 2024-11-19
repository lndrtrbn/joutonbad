import axios from "axios";
import { Injectable } from "@nestjs/common";

import { Auth0RoleUser, Auth0Token } from "./auth0";
import { CONFIG } from "src/config";
import { AppLogger } from "src/utils/AppLogger";
import { InternalErrorException } from "src/exceptions/internalError.exception";

@Injectable()
export class Auth0Service {
  private readonly logger = new AppLogger(Auth0Service.name, "service");

  private async getInternalApiToken() {
    const URL = `${CONFIG.auth0IssuerBaseUrl}oauth/token`;
    const payload = {
      grant_type: "client_credentials",
      audience: CONFIG.auth0ApiAudience,
      client_id: CONFIG.auth0ApiId,
      client_secret: CONFIG.auth0ApiSecret,
    };

    try {
      const { data } = await axios.post<Auth0Token>(URL, payload, {
        headers: { "content-type": "application/x-www-form-urlencoded" },
      });
      return data.access_token;
    } catch (error) {
      this.logger.error("getInternalApiToken", JSON.stringify(error, undefined, 2));
      throw new InternalErrorException();
    }
  }

  async getAdmins() {
    const URL = `${CONFIG.auth0ApiAudience}roles/${CONFIG.auth0RoleEditorId}/users`;
    const token = await this.getInternalApiToken();

    try {
      const { data } = await axios.get<Auth0RoleUser[]>(URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (error) {
      this.logger.error("getInternalApiToken", JSON.stringify(error, undefined, 2));
      throw new InternalErrorException();
    }
  }
}
