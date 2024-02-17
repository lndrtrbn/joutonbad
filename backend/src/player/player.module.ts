import { Module } from "@nestjs/common";

import { PlayerService } from "./player.service";
import { PlayerController } from "./player.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { KeycloakModule } from "src/keycloak/keycloak.module";

@Module({
  imports: [KeycloakModule, PrismaModule],
  controllers: [PlayerController],
  providers: [PlayerService],
  exports: [PlayerService],
})
export class PlayerModule {}
