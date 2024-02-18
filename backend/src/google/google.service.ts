import { google } from "googleapis";
import { Injectable, Logger } from "@nestjs/common";

import {
  getSheets,
  getUpdateRequest,
  initGoogleAuth,
  playersToSheetData,
  registrationsToSheetData,
  tournamentsToSheetData,
} from "src/utils/google";
import { CONFIG } from "src/config";
import { PrismaService } from "src/prisma/prisma.service";
import { CannotExportException } from "src/exceptions/cannotExport.exception";

@Injectable()
export class GoogleService {
  private readonly logger = new Logger(GoogleService.name);

  constructor(private prisma: PrismaService) {
    initGoogleAuth();
  }

  async export(): Promise<void> {
    this.logger.log(`[export] called`);

    // Fetch data from Mongo.
    const players = await this.prisma.player.findMany();
    const tournaments = await this.prisma.tournament.findMany();
    const registrations = await this.prisma.registration.findMany({
      include: {
        player: true,
        tournament: true,
      },
    });
    const registrationsDone = registrations.filter(
      (reg) => reg.sent && !reg.cancelled,
    );
    const registrationsToDo = registrations.filter(
      (reg) => !reg.sent && !reg.cancelled,
    );
    const registrationsCancelled = registrations.filter(
      (reg) => reg.cancelled,
    );

    // Transform data into Google Sheet format.
    const dataPlayers = playersToSheetData(players);
    const dataTournaments = tournamentsToSheetData(tournaments);
    const dataRegistrationsDone =
      registrationsToSheetData(registrationsDone);
    const dataRegistrationsTodo =
      registrationsToSheetData(registrationsToDo);
    const dataRegistrationsCancelled = registrationsToSheetData(
      registrationsCancelled,
    );

    // Sheets definitions.
    const {
      sheetPlayers,
      sheetTournaments,
      sheetRegistrationsDone,
      sheetRegistrationsToDo,
      sheetRegistrationsCancelled,
    } = getSheets();

    try {
      await google.sheets("v4").spreadsheets.batchUpdate({
        spreadsheetId: CONFIG.googleSpreadSheetId,
        requestBody: {
          requests: [
            getUpdateRequest(sheetPlayers, dataPlayers),
            getUpdateRequest(sheetTournaments, dataTournaments),
            getUpdateRequest(
              sheetRegistrationsDone,
              dataRegistrationsDone,
            ),
            getUpdateRequest(
              sheetRegistrationsToDo,
              dataRegistrationsTodo,
            ),
            getUpdateRequest(
              sheetRegistrationsCancelled,
              dataRegistrationsCancelled,
            ),
          ],
        },
      });
    } catch (error) {
      this.logger.error(error);
      throw new CannotExportException();
    }
  }
}
