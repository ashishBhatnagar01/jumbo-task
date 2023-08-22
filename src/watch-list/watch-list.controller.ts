import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BaseController } from '../../core/controller/base.controller';
import { AuthGuard } from '../../core/guards/auth.guard';
import {
  ResponseInterface,
  UserInterface,
} from '../../core/interfaces/interfaces';
import { WatchListService } from './watch-list.service';
import { User } from '../../core/decorators/custom.decorators';
import { WatchLaterDTO } from './dto/watch-list.dto';
import { MessageService } from '../../services/message.service';

@UseGuards(AuthGuard)
@Controller('videos')
export class WatchListController extends BaseController {
  constructor(
    private readonly videosService: WatchListService,
    private readonly messageService: MessageService,
  ) {
    super();
  }
  @Post('watch-list/add')
  async addToWatchLater(
    @Body() data: WatchLaterDTO,
    @User() user: UserInterface,
  ): Promise<ResponseInterface> {
    return this.standardResponse(
      await this.videosService.addToWatchlater(data, user),
      this.messageService.SUCCESS,
    );
  }

  @Get('watch-list')
  async getWatchList(@User() user: UserInterface): Promise<ResponseInterface> {
    return this.standardResponse(
      { items: await this.videosService.watchList(user) },
      this.messageService.SUCCESS,
    );
  }

  @Delete('watch-list/:videoId')
  async deleteFromWatchList(
    @User() user: UserInterface,
    @Param('videoId') videoId: string,
  ): Promise<ResponseInterface> {
    return this.standardResponse(
      await this.videosService.removeFromWatchList(user, videoId),
    );
  }
}
