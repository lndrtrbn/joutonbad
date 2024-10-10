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
  UseGuards,
} from "@nestjs/common";
import { parse } from "csv-parse/sync";
import { Player } from "@prisma/client";
import { FileInterceptor } from "@nestjs/platform-express";

import { CONFIG } from "src/config";
import { AuthGuard } from "src/auth/auth.guard";
import { AppLogger } from "src/utils/AppLogger";
import { trimLicense } from "src/utils/license";
import { PlayerService } from "./player.service";
import { Roles } from "src/auth/roles.decorator";
import { RolesGuard } from "src/auth/roles.guard";
import { UserLicense } from "src/auth/user.decorator";
import { CsvPlayer, PlayerCreatePayload, PlayerUpdatePayload } from "./player";

@Controller("player")
@UseGuards(AuthGuard, RolesGuard)
export class PlayerController {
  private readonly logger = new AppLogger(PlayerController.name, "controller");

  constructor(private readonly playerService: PlayerService) {}

  @Get("/me")
  async getMe(@UserLicense() userLicense: string): Promise<Player> {
    this.logger.log("getMe", `Get a player by its license: ${userLicense}`);

    return this.playerService.getMe(userLicense);
  }

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

  @Get(":license")
  async getBylicense(@Param("license") license: string): Promise<Player> {
    this.logger.log("getBylicense", `Get a player by its license: ${license}`);

    return this.playerService.getOneWhere({
      license: trimLicense(license),
    });
  }

  @Post()
  @Roles([CONFIG.auth0RoleEditor])
  async create(@Body() data: PlayerCreatePayload): Promise<Player> {
    this.logger.log("create", `Create a new player for license: ${data.license}`);

    return this.playerService.create(data);
  }

  @Post("csv")
  @Roles([CONFIG.auth0RoleEditor])
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
    @UserLicense() userLicense: string,
  ): Promise<Player> {
    this.logger.log("update", `Update a player`);

    return this.playerService.update(data, userLicense);
  }

  @Delete(":id")
  @Roles([CONFIG.auth0RoleEditor])
  async delete(@Param("id") id: string): Promise<Player> {
    this.logger.log("delete", `Delete player with id: ${id}`);

    return this.playerService.delete(id);
  }
}
