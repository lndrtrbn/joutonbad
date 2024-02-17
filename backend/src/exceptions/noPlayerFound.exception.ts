import { HttpException, HttpStatus } from "@nestjs/common";

export class NoPlayerFoundException extends HttpException {
  constructor() {
    super("NO_PLAYER_FOUND", HttpStatus.NOT_FOUND);
  }
}
