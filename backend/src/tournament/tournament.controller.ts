import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { Tournament } from "@prisma/client";
import { Resource, Roles } from "nest-keycloak-connect";

import {
  FullTournament,
  TournamentCreatePayload,
  TournamentUpdatePayload,
} from "./tournament";
import { CONFIG } from "src/config";
import { TournamentService } from "./tournament.service";

@Resource("tournament")
@Controller("tournament")
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) {}

  @Get(":id")
  async getById(@Param("id") id: string): Promise<FullTournament> {
    return this.tournamentService.getById(id);
  }

  @Get()
  async get(@Query("ids") ids: string): Promise<FullTournament[]> {
    return ids
      ? this.tournamentService.getByIds(ids.split(","))
      : this.tournamentService.getAll();
  }

  @Get("license/:license")
  async getByPlayer(
    @Param("license") license: string,
  ): Promise<FullTournament[]> {
    return this.tournamentService.getPlayerTournament(license);
  }

  @Post()
  @Roles({ roles: [CONFIG.kcRoleEditor] })
  async create(@Body() data: TournamentCreatePayload): Promise<Tournament> {
    return this.tournamentService.create(data);
  }

  @Patch(":id")
  @Roles({ roles: [CONFIG.kcRoleEditor] })
  async update(
    @Param("id") id: string,
    @Body() data: TournamentUpdatePayload,
  ): Promise<Tournament> {
    return this.tournamentService.update(id, data);
  }

  @Delete(":id")
  @Roles({ roles: [CONFIG.kcRoleEditor] })
  async delete(@Param("id") id: string): Promise<Tournament> {
    return this.tournamentService.delete(id);
  }
}
