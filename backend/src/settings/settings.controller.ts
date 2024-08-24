import { PlateformSettings } from "@prisma/client";
import { Body, Controller, Get, Patch } from "@nestjs/common";
import { AuthenticatedUser, Resource, Roles } from "nest-keycloak-connect";

import { CONFIG } from "src/config";
import { toStr } from "src/utils/string";
import { AppLogger } from "src/utils/AppLogger";
import { SettingsUpdatePayload } from "./settings";
import { SettingsService } from "./settings.service";
import { AuthenticatedKcUser } from "src/keycloak/keycloakUser";

@Resource("settings")
@Controller("settings")
export class SettingsController {
  private readonly logger = new AppLogger(SettingsController.name, "controller");

  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  @Roles({ roles: [CONFIG.kcRoleEditor] })
  async get(): Promise<PlateformSettings | null> {
    this.logger.log("get", "Get app settings");

    return this.settingsService.get();
  }

  @Patch()
  @Roles({ roles: [CONFIG.kcRoleEditor] })
  async update(
    @Body() data: SettingsUpdatePayload,
    @AuthenticatedUser() kcUser: AuthenticatedKcUser,
  ): Promise<PlateformSettings> {
    this.logger.log("update", `Update app settings with: ${toStr(data)}`);

    return this.settingsService.update(data, kcUser);
  }
}
