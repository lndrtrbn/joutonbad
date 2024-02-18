import { Tournament } from "@prisma/client";
import { Injectable, Logger } from "@nestjs/common";

import {
  FullTournament,
  TournamentCreatePayload,
  TournamentUpdatePayload,
} from "./tournament";
import { PrismaService } from "src/prisma/prisma.service";
import { CannotCreateException } from "src/exceptions/cannotCreate.exception";
import { CannotDeleteException } from "src/exceptions/cannotDelete.exception";
import { NoTournamentFoundException } from "src/exceptions/noTournamentFound.exception";

@Injectable()
export class TournamentService {
  private readonly logger = new Logger(TournamentService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * Get all the tournaments existing in the collection.
   *
   * @returns Array of tournaments.
   */
  async getAll(): Promise<FullTournament[]> {
    this.logger.log(`[getAll] called`);

    return this.prisma.tournament.findMany({
      include: {
        inCharge: true,
        registrations: {
          include: {
            player: true,
          },
        },
      },
    });
  }

  /**
   * Get a list of tournaments that match the given ids.
   *
   * @param ids The list of ids to fetch the tournaments.
   * @returns Array of matching tournaments.
   */
  async getByIds(ids: string[]): Promise<FullTournament[]> {
    this.logger.log(`[getByIds] With: ${ids.join(",")}`);

    return this.prisma.tournament.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      include: {
        inCharge: true,
        registrations: {
          include: {
            player: true,
          },
        },
      },
    });
  }

  /**
   * Get a tournament by id.
   *
   * @param id The id of the tournament to get.
   * @returns Matching tournament.
   */
  async getById(id: string): Promise<FullTournament> {
    return this.prisma.tournament.findUnique({
      where: {
        id,
      },
      include: {
        inCharge: true,
        registrations: {
          include: {
            player: true,
          },
        },
      },
    });
  }

  async getPlayerTournament(
    license: string,
  ): Promise<FullTournament[]> {
    return this.prisma.tournament.findMany({
      where: {
        registrations: {
          some: {
            player: {
              license,
            },
            cancelled: {
              isSet: false,
            },
          },
        },
      },
      include: {
        inCharge: true,
        registrations: {
          include: {
            player: true,
          },
        },
      },
    });
  }

  /**
   * Create a new tournament of the app.
   *
   * @param payload Data of the tournament to create.
   * @returns The created tournament.
   */
  async create(
    payload: TournamentCreatePayload,
  ): Promise<Tournament> {
    this.logger.log(`[create] With: ${payload}`);

    const data = {
      ...payload,
      startDate: new Date(payload.startDate),
      endDate: new Date(payload.endDate),
    };

    try {
      return await this.prisma.tournament.create({ data });
    } catch (error) {
      this.logger.error(`[create] ${error}`);
      throw new CannotCreateException();
    }
  }

  /**
   * Update a tournament.
   *
   * @param id Id of the tournament to update
   * @param payload Data of the tournament to update.
   * @returns The updated tournament.
   */
  async update(
    id: string,
    payload: TournamentUpdatePayload,
  ): Promise<Tournament> {
    this.logger.log(`[update] With: ${payload}`);

    const data = {
      ...payload,
    };

    if (payload.startDate) {
      data.startDate = new Date(payload.startDate as string);
    }
    if (payload.endDate) {
      data.endDate = new Date(payload.endDate as string);
    }

    return this.prisma.tournament.update({
      where: { id },
      data,
    });
  }

  /**
   * Delete a tournament.
   *
   * @param id Id of the tournament to delete.
   * @returns The deleted tournament.
   */
  async delete(id: string) {
    this.logger.log(`[delete] With id: ${id}`);

    const tournament = await this.getById(id);

    if (!tournament) throw new NoTournamentFoundException();
    if (tournament.registrations.length > 0)
      throw new CannotDeleteException();

    return this.prisma.tournament.delete({
      where: { id },
    });
  }
}
