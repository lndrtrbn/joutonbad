import { Controller, Post, UseGuards } from "@nestjs/common";

import { CONFIG } from "src/config";
import { AuthGuard } from "src/auth/auth.guard";
import { AppLogger } from "src/utils/AppLogger";
import { Roles } from "src/auth/roles.decorator";
import { GoogleService } from "./google.service";
import { RolesGuard } from "src/auth/roles.guard";

@Controller("google")
@UseGuards(AuthGuard, RolesGuard)
export class GoogleController {
  private readonly logger = new AppLogger(GoogleController.name, "controller");

  constructor(private readonly googleService: GoogleService) {}

  @Post("export")
  @Roles([CONFIG.auth0RoleEditor])
  async export(): Promise<void> {
    this.logger.log("export", "Exporting data to google drive");

    return this.googleService.export();
  }
}
