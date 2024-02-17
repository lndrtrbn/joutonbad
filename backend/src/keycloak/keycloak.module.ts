import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { KeycloakConnectModule } from "nest-keycloak-connect";
import { AuthGuard, RoleGuard, ResourceGuard } from "nest-keycloak-connect";

import { CONFIG } from "src/config";
import { KeycloakService } from "./keycloak.service";

@Module({
  imports: [
    KeycloakConnectModule.register({
      authServerUrl: CONFIG.kcExternalUrl,
      realm: CONFIG.kcRealm,
      clientId: CONFIG.kcClientId,
      secret: CONFIG.kcClientSecret,
    }),
  ],
  providers: [
    KeycloakService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
  exports: [KeycloakService],
})
export class KeycloakModule {}
