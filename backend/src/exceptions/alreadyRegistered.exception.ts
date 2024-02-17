import { HttpException, HttpStatus } from "@nestjs/common";

export class AlreadyRegisteredException extends HttpException {
  constructor() {
    super("ALREADY_REGISTERED", HttpStatus.FORBIDDEN);
  }
}
