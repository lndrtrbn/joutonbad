import * as dotenv from "dotenv";
dotenv.config({ path: `${process.env.NODE_ENV ?? ""}.env` });

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { CONFIG, testConfig } from "./config";
import { PrismaService } from "./prisma/prisma.service";
import { VERSION } from "./version";

async function bootstrap() {
  console.log(`[VERSION] ${VERSION}`);
  testConfig();
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // FOR DEV
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  await app.listen(CONFIG.port);
}
bootstrap();
