import { Injectable } from "@nestjs/common";
import { Player, Prisma } from "@prisma/client";

import {
  CsvPlayer,
  PlayerCreatePayload,
  PlayerUpdatePayload,
  csvPlayerToCreatePayload,
} from "./player";
import { AppLogger } from "src/utils/AppLogger";
import { trimLicense } from "src/utils/license";
import { PrismaService } from "src/prisma/prisma.service";
import { CannotCreateException } from "src/exceptions/cannotCreate.exception";
import { NoPlayerFoundException } from "src/exceptions/noPlayerFound.exception";

@Injectable()
export class PlayerService {
  private readonly logger = new AppLogger(PlayerService.name, "service");

  constructor(private prisma: PrismaService) {}

  /**
   * Get a list of players.
   *
   * @param where The conditions to players to fetch.
   * @returns Array of matching players.
   */
  async getWhere(where?: Prisma.PlayerWhereInput): Promise<Player[]> {
    return this.prisma.player.findMany({
      where,
    });
  }

  /**
   * Find a player.
   *
   * @param where The conditions of the player to fetch.
   * @returns The player match the conditions.
   */
  async getOneWhere(where?: Prisma.PlayerWhereInput): Promise<Player> {
    const player = await this.prisma.player.findFirst({
      where,
    });
    if (!player) {
      this.logger.error(
        "getOneWhere",
        `No player found with conditions: ${JSON.stringify(where)}`,
      );
      throw new NoPlayerFoundException();
    }
    return player;
  }

  /**
   * Fetch player by license and set as active if not already.
   *
   * @param license The license to use to fetch player.
   * @returns The player
   */
  async getMe(license: string): Promise<Player> {
    const player = await this.prisma.findMe(license);

    if (!player.active) {
      this.logger.log("getMe", `Player activated: ${license}`);
      return this.prisma.player.update({
        where: { license: player.license },
        data: {
          active: true,
        },
      });
    }
    return player;
  }

  /**
   * Create a new player of the app.
   *
   * @param payload Data of the player to create.
   * @returns The created player.
   */
  async create(payload: PlayerCreatePayload): Promise<Player> {
    this.logger.log("create", `${payload}`);
    const license = trimLicense(payload.license);

    const data = {
      ...payload,
      license,
      active: false,
    };

    try {
      return await this.prisma.player.create({ data });
    } catch (error) {
      this.logger.error("create", error);
      throw new CannotCreateException();
    }
  }

  async upload(players: CsvPlayer[]): Promise<Player[]> {
    this.logger.log("upload", `All players: ${players}`);

    const allPlayerLicenses = (await this.prisma.player.findMany()).map(
      (p) => p.license,
    );
    const csvPlayersToAdd = players.filter(
      (p) => !allPlayerLicenses.includes(trimLicense(p[2])),
    );

    this.logger.log("upload", `To add: ${csvPlayersToAdd}`);

    if (csvPlayersToAdd.length == 0) {
      return [];
    }

    const playersToAdd = csvPlayersToAdd.map((data) => {
      const player = csvPlayerToCreatePayload(data);
      return {
        ...player,
        active: false,
      };
    });

    try {
      return this.prisma.$transaction(
        playersToAdd.map((data) =>
          this.prisma.player.create({
            data,
          }),
        ),
      );
    } catch (error) {
      throw new CannotCreateException();
    }
  }

  /**
   * Update a player.
   *
   * @param data Data of the player to update.
   * @param licence The licence of the user that made the request.
   * @returns The updated player.
   */
  async update(data: PlayerUpdatePayload, license: string): Promise<Player> {
    const currentPlayer = await this.prisma.findMe(license);

    return this.prisma.player.update({
      where: { id: currentPlayer.id },
      data,
    });
  }

  /**
   * Delete a player.
   *
   * @param id Id of the player to delete.
   * @returns The deleted player.
   */
  async delete(id: string) {
    return this.prisma.player.delete({
      where: { id },
    });
  }
}
