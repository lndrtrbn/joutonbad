import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from "@nestjs/common";
import { parse } from "csv-parse/sync";
import { Player } from "@prisma/client";
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthenticatedUser, Resource, Roles } from "nest-keycloak-connect";

import { CONFIG } from "src/config";
import { AppLogger } from "src/utils/AppLogger";
import { trimLicense } from "src/utils/license";
import { PlayerService } from "./player.service";
import { AuthenticatedKcUser } from "src/keycloak/keycloakUser";
import { KeycloakService } from "src/keycloak/keycloak.service";
import { CsvPlayer, PlayerCreatePayload, PlayerUpdatePayload } from "./player";

@Resource("player")
@Controller("player")
export class PlayerController {
  private readonly logger = new AppLogger(PlayerController.name, "controller");

  constructor(
    private readonly playerService: PlayerService,
    private keycloakService: KeycloakService,
  ) {}

  @Get()
  async get(@Query("ids") ids: string | undefined): Promise<Player[]> {
    this.logger.log("get", `Get players with ids: ${ids ?? "-"}`);

    return this.playerService.getWhere(
      ids
        ? {
            id: {
              in: ids.split(","),
            },
          }
        : undefined,
    );
  }

  @Get("admins")
  @Roles({ roles: [CONFIG.kcRoleEditor] })
  async getAdmins(): Promise<Player[]> {
    this.logger.log("getAdmins", "Get all admin players");

    const keycloakUsers = await this.keycloakService.getAdminUsers();
    const adminIds = keycloakUsers.map((user) => user.id);

    return this.playerService.getWhere({
      kcId: {
        in: adminIds,
      },
    });
  }

  @Get(":license")
  async getBylicense(@Param("license") license: string): Promise<Player> {
    this.logger.log("findByLicense", `Get a player by its license: ${license}`);

    return this.playerService.getOneWhere({
      license: trimLicense(license),
    });
  }

  @Post()
  @Roles({ roles: [CONFIG.kcRoleEditor] })
  async create(@Body() data: PlayerCreatePayload): Promise<Player> {
    this.logger.log("create", `Create a new player for license: ${data.license}`);

    return this.playerService.create(data);
  }

  @Post("csv")
  @Roles({ roles: [CONFIG.kcRoleEditor] })
  @UseInterceptors(FileInterceptor("file"))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10000 }),
          new FileTypeValidator({ fileType: ".csv" }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    this.logger.log(
      "uploadFile",
      `Import multiple payers with CSV file: ${file.filename}`,
    );

    const players: CsvPlayer[] = parse(file.buffer, {
      delimiter: ";",
      trim: true,
      encoding: "latin1",
      from_line: 2,
    });
    return this.playerService.upload(players);
  }

  @Patch("profil")
  async update(
    @Body() data: PlayerUpdatePayload,
    @AuthenticatedUser() kcUser: AuthenticatedKcUser,
  ): Promise<Player> {
    this.logger.log("update", `Update a player`);

    return this.playerService.update(data, kcUser);
  }

  @Delete(":id")
  @Roles({ roles: [CONFIG.kcRoleEditor] })
  async delete(@Param("id") id: string): Promise<Player> {
    this.logger.log("delete", `Delete player with id: ${id}`);

    return this.playerService.delete(id);
  }
}
