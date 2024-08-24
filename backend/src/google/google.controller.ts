import { Roles } from "nest-keycloak-connect";
import { Controller, Post } from "@nestjs/common";

import { CONFIG } from "src/config";
import { AppLogger } from "src/utils/AppLogger";
import { GoogleService } from "./google.service";

@Controller("google")
export class GoogleController {
  private readonly logger = new AppLogger(GoogleController.name, "controller");

  constructor(private readonly googleService: GoogleService) {}

  @Post("export")
  @Roles({ roles: [CONFIG.kcRoleEditor] })
  async export(): Promise<void> {
    this.logger.log("export", "Exporting data to google drive");

    return this.googleService.export();
  }
}
