import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";

import { AuthGuard } from "./auth.guard";
import { PlayerModule } from "src/player/player.module";

@Module({
  imports: [PlayerModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
