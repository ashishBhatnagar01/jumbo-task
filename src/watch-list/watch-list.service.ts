import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { videos, watch_later_videos } from '@prisma/client';
import {
  UserInterface,
  WatchListInterface,
} from '../../core/interfaces/interfaces';
import { WatchLaterDTO } from './dto/watch-list.dto';
import { MessageService } from '../../services/message.service';

@Injectable()
export class WatchListService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly messageService: MessageService,
  ) {}

  async addToWatchlater(data, user: UserInterface): Promise<boolean> {
    const doesRecordExist = await this.prisma.watch_later_videos.findFirst({
      where: {
        video_id: data.video_id,
        user_id: user.id,
      },
    });
    if (doesRecordExist)
      throw new HttpException(this.messageService.ALREADY_ADDED, 400);
    await this.prisma.watch_later_videos.create({
      data: {
        video_id: data.video_id,
        user_id: user.id,
      },
    });
    return true;
  }

  async watchList(user: UserInterface) {
    const data = await this.prisma.watch_later_videos.findMany({
      where: {
        user_id: user.id,
      },
      include: {
        video: true,
      },
    });
    return data;
  }

  async removeFromWatchList(
    user: UserInterface,
    videoId: string,
  ): Promise<boolean> {
    const record = await this.prisma.watch_later_videos.findFirst({
      where: {
        video_id: videoId,
      },
    });
    if (!record)
      throw new HttpException(this.messageService.INVALID_VIDEO_ID, 400);
    if (user.id !== record.user_id)
      throw new HttpException(this.messageService.UNAUTHORIZED, 401);
    await this.prisma.watch_later_videos.delete({
      where: {
        id: record.id,
      },
    });
    return true;
  }
}
