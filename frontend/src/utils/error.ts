export enum APIErrorMessage {
  ALREADY_EXISTING_USER = "ALREADY_EXISTING_USER",
  ALREADY_REGISTERED = "ALREADY_REGISTERED",
  ALREADY_REGISTERED_PARTNER = "ALREADY_REGISTERED_PARTNER",
  CANNOT_CREATE = "CANNOT_CREATE",
  CANNOT_DELETE = "CANNOT_DELETE",
  CANNOT_EXPORT = "CANNOT_EXPORT",
  FREEZED_TOURNAMENT = "FREEZED_TOURNAMENT",
  INTERNAL_ERROR = "INTERNAL_ERROR",
  NO_PLAYER_FOUND = "NO_PLAYER_FOUND",
  NO_TOURNAMENT_FOUND = "NO_TOURNAMENT_FOUND",
  PLAYER_ALREADY_LINKED = "PLAYER_ALREADY_LINKED",
  UNAUTHORIZED = "Unauthorized",
  WHO_ARE_YOU = "WHO_ARE_YOU",
}

type IAPIError = {
  statusCode: number;
  message: APIErrorMessage;
};

export class APIError extends Error {
  statusCode: number;
  message: APIErrorMessage;

  constructor(data: IAPIError) {
    super();
    this.statusCode = data.statusCode;
    this.message = data.message;
  }
}
