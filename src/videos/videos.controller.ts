import { Controller, Get, Param, Query } from '@nestjs/common';
import { BaseController } from '../../core/controller/base.controller';
import { VideosService } from './videos.service';
import { videos } from '@prisma/client';
import { ResponseInterface } from '../../core/interfaces/interfaces';

@Controller('video')
export class VideosController extends BaseController {
  constructor(private readonly videosService: VideosService) {
    super();
  }

  @Get('list')
  async videoList(
    @Query('page') page: number,
    @Query('per_page') per_page: number,
  ): Promise<ResponseInterface> {
    return this.standardResponse(
      await this.videosService.videoList(Number(page), Number(per_page)),
    );
  }

  @Get('/:videoId')
  async getVideoById(
    @Param('videoId') videoId: string,
  ): Promise<ResponseInterface> {
    return this.standardResponse(await this.videosService.videoById(videoId));
  }

  @Get('')
  async searchByTitle(@Query('title') title:string): Promise<ResponseInterface> {
    return this.standardResponse(await this.videosService.searchByTitle(title))
  }
}
