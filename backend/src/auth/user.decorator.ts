import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const UserLicense = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user.license;
  },
);
