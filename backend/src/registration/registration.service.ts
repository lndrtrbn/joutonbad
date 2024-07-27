import { Injectable, Logger } from "@nestjs/common";
import { Prisma, Registration } from "@prisma/client";

import {
  RegistrationCreatePayload,
  RegistrationUpdatePayload,
} from "./registration";
import { trimLicense } from "src/utils/license";
import { PrismaService } from "src/prisma/prisma.service";
import { PlayerService } from "src/player/player.service";
import { CannotCreateException } from "src/exceptions/cannotCreate.exception";
import { CannotDeleteException } from "src/exceptions/cannotDelete.exception";
import { NoPlayerFoundException } from "src/exceptions/noPlayerFound.exception";
import { FreezedTournamentException } from "src/exceptions/freezedTournament.exception";
import { AlreadyRegisteredException } from "src/exceptions/alreadyRegistered.exception";
import { AlreadyRegisteredPartnerException } from "src/exceptions/alreadyRegisteredPartner.exception";

@Injectable()
export class RegistrationService {
  private readonly logger = new Logger(RegistrationService.name);

  constructor(private prisma: PrismaService, private playerService: PlayerService) {}

  /**
   * Get all the registration existing in the collection.
   *
   * @returns Array of registrations.
   */
  async getAll(): Promise<Registration[]> {
    return this.prisma.registration.findMany({
      include: {
        player: true,
        tournament: true,
      },
    });
  }

  /**
   * Get a list of registrations.
   *
   * @param where The conditions to registrations to fetch.
   * @returns Array of matching registrations.
   */
  async getWhere(where: Prisma.RegistrationWhereInput): Promise<Registration[]> {
    return this.prisma.registration.findMany({
      where,
      include: {
        player: true,
      },
    });
  }

  /**
   * Create a new registration.
   *
   * @param payload Data of the registration to create.
   * @returns The created registration.
   */
  async create(payload: RegistrationCreatePayload): Promise<Registration> {
    const player = await this.playerService.getOneWhere({
      license: trimLicense(payload.playerLicense),
    });

    if (!player) {
      throw new NoPlayerFoundException();
    }

    const existingRegistration = await this.prisma.registration.findFirst({
      where: {
        player: {
          license: player.license,
        },
        tournamentId: payload.tournamentId,
        discipline: payload.discipline,
        cancelled: {
          isSet: false,
        },
      },
    });

    if (existingRegistration) {
      this.logger.error(`Player ${payload.playerLicense} already registered`);
      throw new AlreadyRegisteredException();
    }

    const tournament = await this.prisma.tournament.findFirst({
      where: {
        id: payload.tournamentId,
      },
    });
    if (tournament.freezed.includes(payload.discipline)) {
      this.logger.error(
        `Tournament ${payload.tournamentId} is freezed for ${payload.discipline}. Cannot register`,
      );
      throw new FreezedTournamentException();
    }

    const registration = {
      discipline: payload.discipline,
      level: payload.level,
      partner: payload.partner
        ? {
            ...payload.partner,
            license: trimLicense(payload.partner.license),
          }
        : undefined,
      player: {
        connect: {
          license: player.license,
        },
      },
      tournament: {
        connect: {
          id: payload.tournamentId,
        },
      },
    };
    const registrations: Prisma.RegistrationCreateInput[] = [registration];

    if (payload.partner) {
      const partner = await this.prisma.player.findUnique({
        where: { license: trimLicense(payload.partner.license) },
      });

      if (partner) {
        registration.partner.club = partner.club;
        registration.partner.name = partner.name;
        registration.partner.lastname = partner.lastname;

        const existingRegistrationPartner = await this.prisma.registration.findFirst(
          {
            where: {
              player: {
                license: partner.license,
              },
              tournamentId: payload.tournamentId,
              discipline: payload.discipline,
              cancelled: {
                isSet: false,
              },
            },
          },
        );

        if (existingRegistrationPartner) {
          this.logger.error(`Player ${payload.partner.license} already registered`);
          throw new AlreadyRegisteredPartnerException();
        }

        if (payload.registerPartner) {
          registrations.push({
            discipline: payload.discipline,
            level: payload.partner.level,
            partner: {
              license: player.license,
              club: player.club,
              name: player.name,
              lastname: player.lastname,
              level: payload.level,
            },
            player: {
              connect: {
                license: partner.license,
              },
            },
            tournament: {
              connect: {
                id: payload.tournamentId,
              },
            },
          });
        }
      }
    }

    try {
      return (
        await this.prisma.$transaction(
          registrations.map((data) => this.prisma.registration.create({ data })),
        )
      )[0];
    } catch (error) {
      this.logger.error(error);
      throw new CannotCreateException();
    }
  }

  /**
   * Update a registration.
   *
   * @param payload Data of the registration to update.
   * @returns The updated registration.
   */
  async update(
    id: string,
    payload: RegistrationUpdatePayload,
  ): Promise<Registration> {
    return this.prisma.registration.update({
      where: { id },
      data: payload,
    });
  }

  /**
   * Delete a registration.
   *
   * @param id Id of the registration to delete.
   * @returns The deleted registration.
   */
  async delete(id: string): Promise<number> {
    const ids = [id];

    try {
      return (
        await this.prisma.$transaction(
          ids.map((i) =>
            this.prisma.registration.delete({
              where: {
                id: i,
              },
            }),
          ),
        )
      ).length;
    } catch (error) {
      this.logger.error(error);
      throw new CannotDeleteException();
    }
  }
}
