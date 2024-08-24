import { Resource, Roles } from "nest-keycloak-connect";
import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";

import {
  RegistrationCreatePayload,
  RegistrationUpdatePayload,
} from "./registration";
import { CONFIG } from "src/config";
import { toStr } from "src/utils/string";
import { Registration } from "@prisma/client";
import { AppLogger } from "src/utils/AppLogger";
import { RegistrationService } from "./registration.service";

@Resource("registration")
@Controller("registration")
export class RegistrationController {
  private readonly logger = new AppLogger(RegistrationController.name, "controller");

  constructor(private readonly registrationService: RegistrationService) {}

  @Get()
  async getAll(): Promise<Registration[]> {
    this.logger.log("getAll", "Get all registrations");

    return this.registrationService.getAll();
  }

  @Get("tournament/:id")
  async getByTournament(@Param("id") id: string): Promise<Registration[]> {
    this.logger.log("getByTournament", `Get registrations for tournament: ${id}`);

    return this.registrationService.getWhere({
      tournamentId: id,
    });
  }

  @Post()
  async create(@Body() data: RegistrationCreatePayload): Promise<Registration> {
    this.logger.log("create", `Create a new tournament: ${toStr(data)}`);

    return this.registrationService.create(data);
  }

  @Patch(":id")
  @Roles({ roles: [CONFIG.kcRoleEditor] })
  async update(
    @Param("id") id: string,
    @Body() data: RegistrationUpdatePayload,
  ): Promise<Registration> {
    this.logger.log("update", `Update tournament: ${id} with ${toStr(data)}`);

    return this.registrationService.update(id, data);
  }

  @Delete(":id")
  @Roles({ roles: [CONFIG.kcRoleEditor] })
  async delete(@Param("id") id: string): Promise<number> {
    this.logger.log("delete", `Delete tournament: ${id}`);

    return this.registrationService.delete(id);
  }
}
