import { HttpException, HttpStatus } from "@nestjs/common";

export class PlayerAlreadyLinkedException extends HttpException {
  constructor() {
    super("PLAYER_ALREADY_LINKED", HttpStatus.CONFLICT);
  }
}
