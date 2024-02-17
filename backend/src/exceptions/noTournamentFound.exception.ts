import { HttpException, HttpStatus } from "@nestjs/common";

export class NoTournamentFoundException extends HttpException {
  constructor() {
    super("NO_TOURNAMENT_FOUND", HttpStatus.NOT_FOUND);
  }
}
