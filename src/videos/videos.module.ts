import { Module } from '@nestjs/common';
import { VideosService } from "./videos.service";
import { VideosController } from "./videos.controller";
import { PrismaService } from "../../services/prisma.service";
import { MessageService } from "../../services/message.service";

@Module({
  providers: [VideosService,PrismaService,MessageService],
  controllers: [VideosController],
})
export class VideosModule {}
