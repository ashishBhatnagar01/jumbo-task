import { Module } from '@nestjs/common';
import { WatchListController } from './watch-list.controller';
import { WatchListService } from './watch-list.service';
import { PrismaService } from "../../services/prisma.service";
import { MessageService } from "../../services/message.service";

@Module({
  controllers: [WatchListController],
  providers: [WatchListService, PrismaService,MessageService],
})
export class WatchListModule {}
