import { PlateformSettings } from "@prisma/client";
import { Body, Controller, Get, Patch, UseGuards } from "@nestjs/common";

import { CONFIG } from "src/config";
import { toStr } from "src/utils/string";
import { AppLogger } from "src/utils/AppLogger";
import { AuthGuard } from "src/auth/auth.guard";
import { Roles } from "src/auth/roles.decorator";
import { RolesGuard } from "src/auth/roles.guard";
import { SettingsUpdatePayload } from "./settings";
import { SettingsService } from "./settings.service";
import { UserLicense } from "src/auth/user.decorator";

@Controller("settings")
@UseGuards(AuthGuard, RolesGuard)
export class SettingsController {
  private readonly logger = new AppLogger(SettingsController.name, "controller");

  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  async get(): Promise<PlateformSettings | null> {
    this.logger.log("get", "Get app settings");

    return this.settingsService.get();
  }

  @Patch()
  @Roles([CONFIG.auth0RoleEditor])
  async update(
    @Body() data: SettingsUpdatePayload,
    @UserLicense() userLicense: string,
  ): Promise<PlateformSettings> {
    this.logger.log("update", `Update app settings with: ${toStr(data)}`);

    return this.settingsService.update(data, userLicense);
  }
}
