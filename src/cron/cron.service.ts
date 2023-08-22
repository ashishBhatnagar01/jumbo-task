import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';
import { PrismaService } from '../../services/prisma.service';
import * as process from 'process';

@Injectable()
export class CronService {
  constructor(private readonly prisma: PrismaService) {}
  private readonly logger = new Logger(CronService.name);

  @Cron(CronExpression.EVERY_2_HOURS)
  async handleCronJob() {
    this.logger.log('Cron job started, Syncing DB....');
    let data = [];
    const response = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/videos?part=id%2Csnippet&chart=mostPopular&regionCode=IN&key=${process.env.YOU_TUBE_API_KEY}&maxResults=50`,
    );
    data = [...data, ...response.data.items];
    let pageToken = response.data.nextPageToken;
    do {
      const response1 = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=id%2Csnippet&chart=mostPopular&regionCode=IN&key=${process.env.YOU_TUBE_API_KEY}&maxResults=50&pageToken=${pageToken}`,
      );
      data = [...data, ...response1.data.items];
      pageToken = response1.data.nextPageToken;
    } while (response.data.pageInfo.totalResults >= data.length && pageToken);

    const formattedData = data.map((item) => {
      return {
        title: item.snippet?.title,
        description: item.snippet?.description,
        thumbnail_url: item.snippet?.thumbnails?.default?.url,
        published_at: item.snippet?.publishedAt,
        video_url: `https://www.youtube.com/watch?v=${item.id}`,
        video_id: item.id,
      };
    });
    await this.prisma.videos.createMany({
      data: formattedData,
      skipDuplicates: true,
    });
    this.logger.log('DB Synced...!!');
  }
}
