import { HttpException, HttpStatus } from "@nestjs/common";

export class FreezedTournamentException extends HttpException {
  constructor() {
    super("FREEZED_TOURNAMENT", HttpStatus.FORBIDDEN);
  }
}
