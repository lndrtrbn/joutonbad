import { HttpException, HttpStatus } from "@nestjs/common";

export class CannotCreateException extends HttpException {
  constructor() {
    super("CANNOT_CREATE", HttpStatus.BAD_REQUEST);
  }
}
