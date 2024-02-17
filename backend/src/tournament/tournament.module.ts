import { Module } from "@nestjs/common";

import { PrismaModule } from "src/prisma/prisma.module";
import { TournamentService } from "./tournament.service";
import { TournamentController } from "./tournament.controller";

@Module({
  imports: [PrismaModule],
  providers: [TournamentService],
  controllers: [TournamentController],
})
export class TournamentModule {}
