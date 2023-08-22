import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { videos } from '@prisma/client';
import { PaginationInterface } from '../../core/interfaces/interfaces';
import { MessageService } from '../../services/message.service';

@Injectable()
export class VideosService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly messageService: MessageService,
  ) {}

  async videoList(
    page: number,
    per_page: number,
  ): Promise<PaginationInterface> {
    let data;
    if (page !== -1) {
      data = await this.prisma.videos.findMany({
        skip: page * per_page,
        take: per_page,
        orderBy: {
          published_at: 'asc',
        },
      });
    } else {
      data = await this.prisma.videos.findMany({
        orderBy: {
          published_at: 'asc',
        },
      });
    }
    const totalRecords = await this.prisma.videos.count();

    return {
      items: data,
      page: page,
      per_page: per_page,
      total_pages: Math.round(totalRecords / per_page),
    };
  }

  async videoById(videoId: string): Promise<videos> {
    const data = await this.prisma.videos.findFirst({
      where: {
        id: videoId,
      },
    });
    if (!data) throw new HttpException(this.messageService.NOT_FOUND, 404);
    return data;
  }

  async searchByTitle(title: string): Promise<{items:any}> {
    const data = await this.prisma.videos.findMany({
      where: {
        title: {
          search: title,
        },
      },
    });
    return {
      items: data,
    };
  }
}
