import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MessageService } from '../services/message.service';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron/cron.service';
import { HttpModule } from '@nestjs/axios';
import { CronModule } from './cron/cron.module';
import { WatchListModule } from './watch-list/watch-list.module';

@Module({
  imports: [
    AuthModule,
    ScheduleModule.forRoot(),
    HttpModule,
    CronModule,
    WatchListModule,
  ],
  controllers: [AppController],
  providers: [AppService, MessageService],
})
export class AppModule {}
