import { PrismaClient, Player } from "@prisma/client";
import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";

import { AppLogger } from "src/utils/AppLogger";
import { WhoAreYouException } from "../exceptions/whoAreYou.exception";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new AppLogger(PrismaService.name, "service");

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on("beforeExit", async () => {
      await app.close();
    });
  }

  async findMe(license: string): Promise<Player> {
    const me = await this.player.findFirst({
      where: { license },
    });
    if (!me) {
      this.logger.error("findMe", `No player found with license: ${license}`);
      throw new WhoAreYouException();
    }
    return me;
  }
}
