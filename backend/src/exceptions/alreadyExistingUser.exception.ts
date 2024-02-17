import { HttpException, HttpStatus } from "@nestjs/common";

export class AlreadyExistingUserException extends HttpException {
  constructor() {
    super("ALREADY_EXISTING_USER", HttpStatus.CONFLICT);
  }
}
