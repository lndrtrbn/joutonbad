import { Module } from "@nestjs/common";

import { PlayerService } from "./player.service";
import { Auth0Module } from "src/auth0/auth0.module";
import { PlayerController } from "./player.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule, Auth0Module],
  controllers: [PlayerController],
  providers: [PlayerService],
  exports: [PlayerService],
})
export class PlayerModule {}
