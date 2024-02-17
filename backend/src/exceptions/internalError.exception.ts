import { HttpException, HttpStatus } from "@nestjs/common";

export class InternalErrorException extends HttpException {
  constructor() {
    super("INTERNAL_ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
