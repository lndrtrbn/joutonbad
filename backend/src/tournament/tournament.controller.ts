import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { Tournament } from "@prisma/client";

import {
  FullTournament,
  TournamentCreatePayload,
  TournamentUpdatePayload,
} from "./tournament";
import { CONFIG } from "src/config";
import { toStr } from "src/utils/string";
import { AppLogger } from "src/utils/AppLogger";
import { AuthGuard } from "src/auth/auth.guard";
import { Roles } from "src/auth/roles.decorator";
import { RolesGuard } from "src/auth/roles.guard";
import { TournamentService } from "./tournament.service";

@Controller("tournament")
@UseGuards(AuthGuard, RolesGuard)
export class TournamentController {
  private readonly logger = new AppLogger(TournamentController.name, "controller");

  constructor(private readonly tournamentService: TournamentService) {}

  @Get(":id")
  async getById(@Param("id") id: string): Promise<FullTournament> {
    this.logger.log("getById", `Get a tournament by id: ${id}`);

    return this.tournamentService.getById(id);
  }

  @Get()
  async get(@Query("ids") ids: string): Promise<FullTournament[]> {
    this.logger.log("get", `Get all tournaments (ids: ${ids ?? "-"})`);

    return ids
      ? this.tournamentService.getByIds(ids.split(","))
      : this.tournamentService.getAll();
  }

  @Get("license/:license")
  async getByPlayer(@Param("license") license: string): Promise<FullTournament[]> {
    this.logger.log("getByPlayer", `Get tournaments for player: ${license}`);

    return this.tournamentService.getPlayerTournament(license);
  }

  @Post()
  @Roles([CONFIG.auth0RoleEditor])
  async create(@Body() data: TournamentCreatePayload): Promise<Tournament> {
    this.logger.log("create", `Create a new tournament: ${toStr(data)}`);

    return this.tournamentService.create(data);
  }

  @Patch(":id")
  @Roles([CONFIG.auth0RoleEditor])
  async update(
    @Param("id") id: string,
    @Body() data: TournamentUpdatePayload,
  ): Promise<Tournament> {
    this.logger.log("update", `Update tournament ${id} with: ${toStr(data)}`);

    return this.tournamentService.update(id, data);
  }

  @Delete(":id")
  @Roles([CONFIG.auth0RoleEditor])
  async delete(@Param("id") id: string): Promise<Tournament> {
    this.logger.log("delete", `Delete tournament: ${id}`);

    return this.tournamentService.delete(id);
  }
}
