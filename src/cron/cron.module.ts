import { Module } from '@nestjs/common';
import { CronService } from "./cron.service";
import { PrismaService } from "../../services/prisma.service";

@Module({
  providers: [CronService,PrismaService]
})
export class CronModule {}
