import { Logger } from "@nestjs/common";

type AppLoggerType = "controller" | "service" | "guard";

const COLORS = {
  green: "32",
  yellow: "33",
  blue: "34",
  magenta: "35",
  cyan: "36",
};

export class AppLogger {
  private logger: Logger;
  private color: string;
  private prefix: string;

  constructor(name: string, private type: AppLoggerType) {
    this.logger = new Logger(name);
    this.color = type === "controller" ? COLORS.blue : COLORS.yellow;
    this.prefix = " ".repeat(22 - name.length);
  }

  log(caller: string, message: string) {
    const context = this.type === "controller" ? `[${caller}]` : `${caller}()`;
    this.logger.log(`\x1b[${this.color}m${this.prefix}${context} ${message}\x1b[0m`);
  }

  error(caller: string, message: string) {
    const context = this.type === "controller" ? `[${caller}]` : `${caller}()`;
    this.logger.error(`${this.prefix}${context} ${message}`);
  }
}
