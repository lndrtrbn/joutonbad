import { Roles } from "nest-keycloak-connect";
import { Controller, Post } from "@nestjs/common";

import { CONFIG } from "src/config";
import { GoogleService } from "./google.service";

@Controller("google")
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

  @Post("export")
  @Roles({ roles: [CONFIG.kcRoleEditor] })
  async export(): Promise<void> {
    return this.googleService.export();
  }
}
