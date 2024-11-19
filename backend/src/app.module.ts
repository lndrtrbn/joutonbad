import { Module } from "@nestjs/common";

import { AuthModule } from "./auth/auth.module";
import { Auth0Module } from "./auth0/auth0.module";
import { GoogleModule } from "./google/google.module";
import { PlayerModule } from "./player/player.module";
import { SettingsModule } from "./settings/settings.module";
import { TournamentModule } from "./tournament/tournament.module";
import { RegistrationModule } from "./registration/registration.module";

@Module({
  imports: [
    AuthModule,
    GoogleModule,
    PlayerModule,
    TournamentModule,
    RegistrationModule,
    SettingsModule,
    Auth0Module,
  ],
})
export class AppModule {}
