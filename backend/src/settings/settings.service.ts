import { PlateformSettings, Prisma } from "@prisma/client";
import { Injectable, Logger } from "@nestjs/common";

import {
  SettingsCreatePayload,
  SettingsUpdatePayload,
} from "./settings";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthenticatedKcUser } from "src/keycloak/keycloakUser";
import { CannotCreateException } from "src/exceptions/cannotCreate.exception";
import { InternalErrorException } from "src/exceptions/internalError.exception";
import { InvalidPayloadException } from "src/exceptions/invalidPayload.exception";

@Injectable()
export class SettingsService {
  private readonly logger = new Logger(SettingsService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * Get the settings of the platform.
   *
   * @returns The settings of the platform.
   */
  async get(): Promise<PlateformSettings | null> {
    this.logger.log(`[get] called`);

    return this.prisma.plateformSettings.findFirst();
  }

  /**
   * Create the initial plateform settings.
   *
   * @returns The created plateform settings.
   */
  async create(): Promise<PlateformSettings> {
    this.logger.log(`[create] called`);

    const data: SettingsCreatePayload = {
      clubPart: 72,
      history: [],
    };

    try {
      return await this.prisma.plateformSettings.create({ data });
    } catch (error) {
      this.logger.error(`[create] ${error}`);
      throw new CannotCreateException();
    }
  }

  /**
   * Update the settings of the platform.
   *
   * @param payload Data of the update.
   * @returns The updated plateform settings.
   */
  async update(
    payload: SettingsUpdatePayload,
    kcUser: AuthenticatedKcUser,
  ): Promise<PlateformSettings> {
    this.logger.log(`[update] With: ${payload}`);

    const currentPlayer = await this.prisma.findMe(kcUser.sub);

    const settings = await this.get();
    if (!settings) new InternalErrorException();

    const settingsAttributes = Object.keys(settings);
    const attributes = Object.keys(payload);

    if (attributes.some((a) => !settingsAttributes.includes(a)))
      throw new InvalidPayloadException();

    const dateUpdate = new Date();
    const newHistory = attributes.map((a) => ({
      at: dateUpdate,
      by: `${currentPlayer.name} ${currentPlayer.lastname}`,
      attribute: a,
      oldValue: `${settings[a]}`,
      newValue: `${payload[a]}`,
    }));

    const data: Prisma.PlateformSettingsUpdateInput = {
      ...payload,
      history: [...settings.history, ...newHistory],
    };

    return this.prisma.plateformSettings.update({
      where: { id: settings.id },
      data,
    });
  }
}
