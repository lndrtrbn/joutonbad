import { Public } from "nest-keycloak-connect";
import { GrantProperties } from "keycloak-connect";
import { Body, Controller, Post } from "@nestjs/common";

import {
  KeycloakUserCreatePayload,
  RefreshPayload,
  SigninPayload,
  ForgotPwdPayload,
} from "../keycloak/keycloakUser";
import { AuthService } from "./auth.service";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  @Public()
  async signup(@Body() payload: KeycloakUserCreatePayload): Promise<void> {
    await this.authService.createUser(payload);
  }

  @Post("signin")
  @Public()
  async signin(@Body() payload: SigninPayload): Promise<GrantProperties> {
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
    this.authService.executeuserActions(payload.email, ["UPDATE_PASSWORD"]);
  }

  @Post("verifyemail")
  @Public()
  async verifyEmail(@Body() payload: ForgotPwdPayload): Promise<void> {
    this.authService.executeuserActions(payload.email, ["VERIFY_EMAIL"]);
  }
}
