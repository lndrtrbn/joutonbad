import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Logger,
} from "@nestjs/common";
import { Resource, Roles } from "nest-keycloak-connect";

import {
  RegistrationCreatePayload,
  RegistrationUpdatePayload,
} from "./registration";
import { CONFIG } from "src/config";
import { Registration } from "@prisma/client";
import { RegistrationService } from "./registration.service";

@Resource("registration")
@Controller("registration")
export class RegistrationController {
  private readonly logger = new Logger(RegistrationController.name);
  constructor(private readonly registrationService: RegistrationService) {}

  @Get()
  async getAll(): Promise<Registration[]> {
    this.logger.log(`GET /registration`);
    return this.registrationService.getAll();
  }

  @Get("tournament/:id")
  async getByTournament(@Param("id") id: string): Promise<Registration[]> {
    this.logger.log(`GET /registration/tournament/${id}`);
    return this.registrationService.getWhere({
      tournamentId: id,
    });
  }

  @Post()
  async create(@Body() data: RegistrationCreatePayload): Promise<Registration> {
    this.logger.log(`POST /registration ${JSON.stringify(data, undefined, 2)}`);
    return this.registrationService.create(data);
  }

  @Patch(":id")
  @Roles({ roles: [CONFIG.kcRoleEditor] })
  async update(
    @Param("id") id: string,
    @Body() data: RegistrationUpdatePayload,
  ): Promise<Registration> {
    this.logger.log(`PATCH /registration/${id} ${data}`);
    return this.registrationService.update(id, data);
  }

  @Delete(":id")
  @Roles({ roles: [CONFIG.kcRoleEditor] })
  async delete(@Param("id") id: string): Promise<number> {
    this.logger.log(`DELETE /registration/${id}`);
    return this.registrationService.delete(id);
  }
}
