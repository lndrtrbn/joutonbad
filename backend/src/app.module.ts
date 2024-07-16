import { Module } from "@nestjs/common";

import { AuthModule } from "./auth/auth.module";
import { GoogleModule } from "./google/google.module";
import { PlayerModule } from "./player/player.module";
import { KeycloakModule } from "./keycloak/keycloak.module";
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
    KeycloakModule,
  ],
})
export class AppModule {}
