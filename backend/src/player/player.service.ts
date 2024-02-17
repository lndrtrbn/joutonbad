import { Player, Prisma } from "@prisma/client";
import { Injectable, Logger } from "@nestjs/common";

import {
  CsvPlayer,
  PlayerCreatePayload,
  PlayerUpdatePayload,
  csvPlayerToCreatePayload,
} from "./player";
import { trimLicense } from "src/utils/license";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthenticatedKcUser, KeycloakUser } from "src/keycloak/keycloakUser";
import { CannotCreateException } from "src/exceptions/cannotCreate.exception";
import { NoPlayerFoundException } from "src/exceptions/noPlayerFound.exception";
import { PlayerAlreadyLinkedException } from "src/exceptions/playerAlreadyLinked.exception";

@Injectable()
export class PlayerService {
  private readonly logger = new Logger(PlayerService.name);

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
        `No player found with conditions: ${JSON.stringify(where)}`,
      );
      throw new NoPlayerFoundException();
    }
    return player;
  }

  /**
   * Link a keycloak user to a player.
   *
   * @param license The license of the player to link.
   * @param kcUser The keycloak user to link to a player.
   * @returns The linked player.
   */
  async link(license: string, kcUser: KeycloakUser): Promise<Player> {
    this.logger.log(`[link] License: ${license}, With: ${kcUser.id}`);

    const player = await this.getOneWhere({ license: trimLicense(license) });
    if (player.kcId) throw new PlayerAlreadyLinkedException();

    return this.prisma.player.update({
      where: { license: player.license },
      data: {
        kcId: kcUser.id,
      },
    });
  }

  /**
   * Create a new player of the app.
   *
   * @param payload Data of the player to create.
   * @returns The created player.
   */
  async create(payload: PlayerCreatePayload): Promise<Player> {
    this.logger.log(`[create] With: ${payload}`);

    const data = {
      ...payload,
      license: trimLicense(payload.license),
    };

    try {
      return await this.prisma.player.create({ data });
    } catch (error) {
      this.logger.error(error);
      throw new CannotCreateException();
    }
  }

  async upload(players: CsvPlayer[]): Promise<Player[]> {
    this.logger.log(`[upload] With: ${players}`);

    const allPlayerLicenses = (await this.prisma.player.findMany()).map(
      (p) => p.license,
    );
    const playersToAdd = players.filter(
      (p) => !allPlayerLicenses.includes(trimLicense(p[2])),
    );

    this.logger.log(`[upload] To add: ${playersToAdd}`);

    if (playersToAdd.length == 0) {
      return [];
    }

    try {
      return this.prisma.$transaction(
        playersToAdd.map((player) =>
          this.prisma.player.create({
            data: csvPlayerToCreatePayload(player),
          }),
        ),
      );
    } catch (error) {
      throw new CannotCreateException();
    }
  }

  /**
   * Update a player (should be the player matching the keycloak user).
   *
   * @param payload Data of the player to update.
   * @param kcUser The keycloak user that made the request.
   * @returns The updated player.
   */
  async update(
    payload: PlayerUpdatePayload,
    kcUser: AuthenticatedKcUser,
  ): Promise<Player> {
    this.logger.log(`[update] With: ${payload}`);

    const currentPlayer = await this.prisma.findMe(kcUser.sub);

    const data = {
      ...payload,
    };

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
    this.logger.log(`[delete] With id: ${id}`);

    return this.prisma.player.delete({
      where: { id },
    });
  }
}
