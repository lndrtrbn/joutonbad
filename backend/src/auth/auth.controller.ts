import { GrantProperties } from "keycloak-connect";
import { Body, Controller, Post } from "@nestjs/common";
import { Public, Resource } from "nest-keycloak-connect";

import {
  KeycloakUserCreatePayload,
  RefreshPayload,
  SigninPayload,
  ForgotPwdPayload,
} from "../keycloak/keycloakUser";
import { AuthService } from "./auth.service";
import { AppLogger } from "src/utils/AppLogger";

@Resource("auth")
@Controller()
export class AuthController {
  private readonly logger = new AppLogger(AuthController.name, "controller");

  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  @Public()
  async signup(@Body() payload: KeycloakUserCreatePayload): Promise<void> {
    this.logger.log("signup", `Try to signup with license: ${payload.username}`);
    await this.authService.createUser(payload);
  }

  @Post("signin")
  @Public()
  async signin(@Body() payload: SigninPayload): Promise<GrantProperties> {
    this.logger.log("signin", `Try to signin with license: ${payload.username}`);
    return this.authService.signin(payload.username, payload.password);
  }

  @Post("refreshtoken")
  @Public()
  async refresh(@Body() payload: RefreshPayload): Promise<GrantProperties> {
    return this.authService.refreshApiToken(payload.token);
  }

  @Post("forgotpwd")
  @Public()
  async forgotPwd(@Body() payload: ForgotPwdPayload): Promise<void> {
    this.logger.log(
      "forgotpwd",
      `Ask changing password for license: ${payload.email}`,
    );
    this.authService.executeUserActions(payload.email, ["UPDATE_PASSWORD"]);
  }

  @Post("verifyemail")
  @Public()
  async verifyEmail(@Body() payload: ForgotPwdPayload): Promise<void> {
    this.authService.executeUserActions(payload.email, ["VERIFY_EMAIL"]);
  }
}
