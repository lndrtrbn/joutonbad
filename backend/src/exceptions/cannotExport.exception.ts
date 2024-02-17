import { HttpException, HttpStatus } from "@nestjs/common";

export class CannotExportException extends HttpException {
  constructor() {
    super("CANNOT_EXPORT", HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
