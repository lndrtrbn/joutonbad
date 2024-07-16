import { Module } from "@nestjs/common";

import { SettingsService } from "./settings.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { SettingsController } from "./settings.controller";

@Module({
  imports: [PrismaModule],
  providers: [SettingsService],
  controllers: [SettingsController],
})
export class SettingsModule {
  constructor(private settingsService: SettingsService) {
    this.initSettings();
  }

  private async initSettings() {
    let settings = await this.settingsService.get();
    if (!settings) {
      settings = await this.settingsService.create();
    }
  }
}
