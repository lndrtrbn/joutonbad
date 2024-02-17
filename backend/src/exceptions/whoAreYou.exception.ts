import { HttpException, HttpStatus } from "@nestjs/common";

export class WhoAreYouException extends HttpException {
  constructor() {
    super("WHO_ARE_YOU", HttpStatus.NOT_FOUND);
  }
}
