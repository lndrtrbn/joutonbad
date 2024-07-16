import {
  AuthenticatedUser,
  Resource,
  Roles,
} from "nest-keycloak-connect";
import { PlateformSettings } from "@prisma/client";
import { Body, Controller, Get, Patch } from "@nestjs/common";

import { CONFIG } from "src/config";
import { SettingsUpdatePayload } from "./settings";
import { SettingsService } from "./settings.service";
import { AuthenticatedKcUser } from "src/keycloak/keycloakUser";

@Resource("settings")
@Controller("settings")
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  @Roles({ roles: [CONFIG.kcRoleEditor] })
  async get(): Promise<PlateformSettings | null> {
    return this.settingsService.get();
  }

  @Patch()
  @Roles({ roles: [CONFIG.kcRoleEditor] })
  async update(
    @Body() data: SettingsUpdatePayload,
    @AuthenticatedUser() kcUser: AuthenticatedKcUser,
  ): Promise<PlateformSettings> {
    return this.settingsService.update(data, kcUser);
  }
}
