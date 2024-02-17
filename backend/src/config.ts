import { exit } from "process";

type Config = {
  port: number;
  kcUrl: string;
  kcExternalUrl: string;
  kcRealm: string;
  kcClientId: string;
  kcClientSecret: string;
  kcApiUser: string;
  kcApiPwd: string;
  kcRoleEditor: string;
  googleSpreadSheetId: string;
  googlePlayersSheetId: string;
  googleTournamentsSheetId: string;
  googleRegistrationsDoneSheetId: string;
  googleRegistrationsToDoSheetId: string;
  googleRegistrationsCancelledSheetId: string;
};

export const CONFIG: Config = {
  port: parseInt(process.env.API_PORT ?? ""),
  kcUrl: process.env.KC_URL ?? "",
  kcExternalUrl: process.env.KC_EXTERNAL_URL ?? "",
  kcRealm: process.env.KC_REALM ?? "",
  kcClientId: process.env.KC_CLIENTID ?? "",
  kcClientSecret: process.env.KC_CLIENTSECRET ?? "",
  kcApiUser: process.env.KC_API_USER ?? "",
  kcApiPwd: process.env.KC_API_PWD ?? "",
  kcRoleEditor: process.env.KC_ROLE_EDITOR ?? "",
  googleSpreadSheetId: process.env.GOOGLE_SPREADSHEET_ID ?? "",
  googlePlayersSheetId: process.env.GOOGLE_PLAYERS_SHEET_ID ?? "",
  googleTournamentsSheetId: process.env.GOOGLE_TOURNAMENTS_SHEET_ID ?? "",
  googleRegistrationsDoneSheetId:
    process.env.GOOGLE_REGISTRATIONS_DONE_SHEET_ID ?? "",
  googleRegistrationsToDoSheetId:
    process.env.GOOGLE_REGISTRATIONS_TODO_SHEET_ID ?? "",
  googleRegistrationsCancelledSheetId:
    process.env.GOOGLE_REGISTRATIONS_CANCELLED_SHEET_ID ?? "",
};

/**
 * Helper function to verify each env variable exists.
 * Called at server start.
 */
export function testConfig() {
  Object.entries(CONFIG).forEach(([key, value]) => {
    if (!value) {
      console.error(
        `[ERROR] Invalid config, please check your env variables, missing '${key}'.`,
      );
      exit(1);
    }
  });
}
