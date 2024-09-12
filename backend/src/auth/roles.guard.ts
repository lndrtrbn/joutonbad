import { Reflector } from "@nestjs/core";
import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";

import { Roles } from "./roles.decorator";
import { UnauthorizedException } from "src/exceptions/unauthorized.exception";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles || roles.length === 0) return true;

    const request = context.switchToHttp().getRequest();
    const haveRoles = roles.every((r) => (request.user.roles ?? []).includes(r));
    if (!haveRoles) throw new UnauthorizedException();
    return true;
  }
}
