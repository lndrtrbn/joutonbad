import { PrismaClient, Player } from "@prisma/client";
import {
  INestApplication,
  Injectable,
  OnModuleInit,
} from "@nestjs/common";

import { WhoAreYouException } from "../exceptions/whoAreYou.exception";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit
{
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on("beforeExit", async () => {
      await app.close();
    });
  }

  async findMe(kcId: string): Promise<Player> {
    const me = await this.player.findFirst({
      where: { kcId },
    });
    if (!me) throw new WhoAreYouException();
    return me;
  }
}
