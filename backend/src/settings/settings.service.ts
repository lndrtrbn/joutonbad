import { Injectable } from "@nestjs/common";
import { PlateformSettings, Prisma } from "@prisma/client";

import { AppLogger } from "src/utils/AppLogger";
import { PrismaService } from "src/prisma/prisma.service";
import { SettingsCreatePayload, SettingsUpdatePayload } from "./settings";
import { CannotCreateException } from "src/exceptions/cannotCreate.exception";
import { InternalErrorException } from "src/exceptions/internalError.exception";
import { InvalidPayloadException } from "src/exceptions/invalidPayload.exception";

@Injectable()
export class SettingsService {
  private readonly logger = new AppLogger(SettingsService.name, "service");

  constructor(private prisma: PrismaService) {}

  /**
   * Get the settings of the platform.
   *
   * @returns The settings of the platform.
   */
  async get(): Promise<PlateformSettings | null> {
    return this.prisma.plateformSettings.findFirst();
  }

  /**
   * Create the initial plateform settings.
   *
   * @returns The created plateform settings.
   */
  async create(): Promise<PlateformSettings> {
    const data: SettingsCreatePayload = {
      clubPart: 72,
      history: [],
    };

    try {
      return await this.prisma.plateformSettings.create({ data });
    } catch (error) {
      this.logger.error("create", `${error}`);
      throw new CannotCreateException();
    }
  }

  /**
   * Update the settings of the platform.
   *
   * @param payload Data of the update.
   * @param userLicense License of the user making the request.
   * @returns The updated plateform settings.
   */
  async update(
    payload: SettingsUpdatePayload,
    userLicense: string,
  ): Promise<PlateformSettings> {
    const currentPlayer = await this.prisma.findMe(userLicense);

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
