import { Module } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PlayerModule } from "src/player/player.module";
import { KeycloakModule } from "src/keycloak/keycloak.module";

@Module({
  imports: [KeycloakModule, PlayerModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
