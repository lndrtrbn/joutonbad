import { exit } from "process";

type Config = {
  port: number;
  auth0Audience: string;
  auth0RoleEditor: string;
  auth0RoleEditorId: string;
  auth0IssuerBaseUrl: string;
  auth0ApiId: string;
  auth0ApiAudience: string;
  auth0ApiSecret: string;
  googleSpreadSheetId: string;
  googlePlayersSheetId: string;
  googleTournamentsSheetId: string;
  googleRegistrationsDoneSheetId: string;
  googleRegistrationsToDoSheetId: string;
  googleRegistrationsCancelledSheetId: string;
};

export const CONFIG: Config = {
  port: parseInt(process.env.API_PORT ?? ""),
  auth0Audience: process.env.AUTH0_AUDIENCE ?? "",
  auth0RoleEditor: process.env.AUTH0_ROLE_EDITOR ?? "",
  auth0RoleEditorId: process.env.AUTH0_ROLE_EDITOR_ID ?? "",
  auth0IssuerBaseUrl: process.env.AUTH0_ISSUER_BASE_URL ?? "",
  auth0ApiId: process.env.AUTH0_API_ID ?? "",
  auth0ApiAudience: process.env.AUTH0_API_AUDIENCE ?? "",
  auth0ApiSecret: process.env.AUTH0_API_SECRET ?? "",
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
