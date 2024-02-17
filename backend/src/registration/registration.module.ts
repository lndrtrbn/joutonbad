import { Module } from "@nestjs/common";

import { PrismaModule } from "src/prisma/prisma.module";
import { PlayerModule } from "src/player/player.module";
import { RegistrationService } from "./registration.service";
import { RegistrationController } from "./registration.controller";

@Module({
  imports: [PrismaModule, PlayerModule],
  providers: [RegistrationService],
  controllers: [RegistrationController],
})
export class RegistrationModule {}
