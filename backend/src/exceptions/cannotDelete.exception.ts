import { HttpException, HttpStatus } from "@nestjs/common";

export class CannotDeleteException extends HttpException {
  constructor() {
    super("CANNOT_DELETE", HttpStatus.BAD_REQUEST);
  }
}
