import { google } from "googleapis";
import { Player, Tournament } from "@prisma/client";
import { sheets_v4 } from "googleapis/build/src/apis/sheets";

import { CONFIG } from "src/config";
import { FullRegistration } from "src/registration/registration";

export function initGoogleAuth() {
  const auth = new google.auth.GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    keyFile: "./google-private-key.json",
  });
  google.options({ auth });
}

export function getSheets() {
  return {
    sheetPlayers: {
      sheetId: parseInt(CONFIG.googlePlayersSheetId),
      startColumnIndex: 0,
      endColumnIndex: 3,
    },
    sheetTournaments: {
      sheetId: parseInt(CONFIG.googleTournamentsSheetId),
      startColumnIndex: 0,
      endColumnIndex: 10,
    },
    sheetRegistrationsDone: {
      sheetId: parseInt(CONFIG.googleRegistrationsDoneSheetId),
      startColumnIndex: 0,
      endColumnIndex: 11,
    },
    sheetRegistrationsToDo: {
      sheetId: parseInt(CONFIG.googleRegistrationsToDoSheetId),
      startColumnIndex: 0,
      endColumnIndex: 11,
    },
    sheetRegistrationsCancelled: {
      sheetId: parseInt(CONFIG.googleRegistrationsCancelledSheetId),
      startColumnIndex: 0,
      endColumnIndex: 11,
    },
  };
}

export function getUpdateRequest(
  range: sheets_v4.Schema$GridRange,
  rows: sheets_v4.Schema$RowData[],
): sheets_v4.Schema$Request {
  return {
    updateCells: {
      fields: "*",
      range,
      rows,
    },
  };
}

export function playersToSheetData(
  players: Player[],
): sheets_v4.Schema$RowData[] {
  const header = {
    values: [
      { userEnteredValue: { stringValue: "Prénom" } },
      { userEnteredValue: { stringValue: "Nom" } },
      { userEnteredValue: { stringValue: "Licence" } },
    ],
  };

  const data = players.map((player) => ({
    values: [
      { userEnteredValue: { stringValue: player.name } },
      { userEnteredValue: { stringValue: player.lastname } },
      { userEnteredValue: { numberValue: parseInt(player.license) } },
    ],
  }));

  return [header, ...data];
}

export function tournamentsToSheetData(
  tournaments: Tournament[],
): sheets_v4.Schema$RowData[] {
  const header = {
    values: [
      { userEnteredValue: { stringValue: "Nom" } },
      { userEnteredValue: { stringValue: "Lieu" } },
      { userEnteredValue: { stringValue: "Catégories" } },
      { userEnteredValue: { stringValue: "Début" } },
      { userEnteredValue: { stringValue: "Fin" } },
      { userEnteredValue: { stringValue: "Prix 1 tab" } },
      { userEnteredValue: { stringValue: "Prix 2 tab" } },
      { userEnteredValue: { stringValue: "Prix 3 tab" } },
      { userEnteredValue: { stringValue: "Niveau min" } },
      { userEnteredValue: { stringValue: "Niveau max" } },
    ],
  };

  const data = tournaments.map((tournament) => ({
    values: [
      { userEnteredValue: { stringValue: tournament.name } },
      { userEnteredValue: { stringValue: tournament.location } },
      {
        userEnteredValue: {
          stringValue: tournament.disciplines.join(","),
        },
      },
      {
        userEnteredValue: {
          // https://stackoverflow.com/a/73535864
          numberValue:
            (tournament.startDate.getTime() / 1000 + 3600) / 86400 +
            25569,
        },
        userEnteredFormat: {
          numberFormat: {
            type: "DATE",
            pattern: "d/m/yy",
          },
        },
      },
      {
        userEnteredValue: {
          // https://stackoverflow.com/a/73535864
          numberValue:
            (tournament.endDate.getTime() / 1000 + 3600) / 86400 +
            25569,
        },
        userEnteredFormat: {
          numberFormat: {
            type: "DATE",
            pattern: "d/m/yy",
          },
        },
      },
      {
        userEnteredValue: { numberValue: tournament.prices[0] ?? -1 },
      },
      {
        userEnteredValue: { numberValue: tournament.prices[1] ?? -1 },
      },
      {
        userEnteredValue: { numberValue: tournament.prices[2] ?? -1 },
      },
      { userEnteredValue: { stringValue: tournament.minLevel } },
      { userEnteredValue: { stringValue: tournament.maxLevel } },
    ],
  }));

  return [header, ...data];
}

export function registrationsToSheetData(
  registrations: FullRegistration[],
): sheets_v4.Schema$RowData[] {
  const header = {
    values: [
      { userEnteredValue: { stringValue: "Date" } },
      { userEnteredValue: { stringValue: "Licence" } },
      { userEnteredValue: { stringValue: "Nom" } },
      { userEnteredValue: { stringValue: "Tournoi" } },
      { userEnteredValue: { stringValue: "Catégorie" } },
      { userEnteredValue: { stringValue: "Niveau" } },
      { userEnteredValue: { stringValue: "Licence partenaire" } },
      { userEnteredValue: { stringValue: "Nom partenaire" } },
      { userEnteredValue: { stringValue: "Niveau partenaire" } },
      { userEnteredValue: { stringValue: "Club partenaire" } },
    ],
  };

  const data = registrations.map((reg) => {
    const row = {
      values: [
        {
          userEnteredValue: {
            // https://stackoverflow.com/a/73535864
            numberValue:
              (reg.createdAt.getTime() / 1000 + 3600) / 86400 + 25569,
          },
          userEnteredFormat: {
            numberFormat: {
              type: "DATE",
              pattern: "d/m/yy",
            },
          },
        },
        {
          userEnteredValue: {
            numberValue: parseInt(reg.player.license),
          },
        },
        {
          userEnteredValue: {
            stringValue: `${reg.player.name} ${reg.player.lastname}`,
          },
        },
        { userEnteredValue: { stringValue: reg.tournament.name } },
        { userEnteredValue: { stringValue: reg.discipline } },
        { userEnteredValue: { stringValue: reg.level } },
      ],
    };
    if (reg.partner) {
      row.values = [
        ...row.values,
        {
          userEnteredValue: {
            numberValue: parseInt(reg.partner.license),
          },
        },
        {
          userEnteredValue: {
            stringValue: `${reg.partner.name} ${reg.partner.lastname}`,
          },
        },
        { userEnteredValue: { stringValue: reg.partner.level } },
        { userEnteredValue: { stringValue: reg.partner.club } },
      ];
    }
    return row;
  });

  return [header, ...data];
}
