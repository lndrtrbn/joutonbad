import { Request, Response } from "express";
import { expressjwt, UnauthorizedError } from "express-jwt";
import { expressJwtSecret, GetVerificationKey } from "jwks-rsa";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

import { CONFIG } from "src/config";
import { promisify } from "src/utils/promise";
import { AppLogger } from "src/utils/AppLogger";
import { trimLicense } from "src/utils/license";
import { UnauthorizedException } from "src/exceptions/unauthorized.exception";
import { InternalErrorException } from "src/exceptions/internalError.exception";

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new AppLogger(AuthGuard.name, "guard");

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const checkJwt = promisify(
      expressjwt({
        secret: expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 10,
          jwksUri: `${CONFIG.auth0IssuerBaseUrl}.well-known/jwks.json`,
        }) as GetVerificationKey,
        audience: CONFIG.auth0Audience,
        issuer: CONFIG.auth0IssuerBaseUrl,
        algorithms: ["RS256"],
      }),
    );
    try {
      await checkJwt(request, response);
      request["user"] = {
        license: trimLicense(request["auth"].joutonbad.license),
        roles: request["auth"].joutonbad.roles,
      };
      return true;
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        this.logger.error("canActivate", "Unauthorized");
        throw new UnauthorizedException();
      }
      console.log(error);
      throw new InternalErrorException();
    }
  }
}
