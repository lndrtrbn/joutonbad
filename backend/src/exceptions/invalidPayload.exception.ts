import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidPayloadException extends HttpException {
  constructor() {
    super("INVALID_PAYLOAD", HttpStatus.BAD_REQUEST);
  }
}
