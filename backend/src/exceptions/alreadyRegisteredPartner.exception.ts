import { HttpException, HttpStatus } from "@nestjs/common";

export class AlreadyRegisteredPartnerException extends HttpException {
  constructor() {
    super("ALREADY_REGISTERED_PARTNER", HttpStatus.FORBIDDEN);
  }
}
