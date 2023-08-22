import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MessageService } from "../services/message.service";

@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [AppService, MessageService],
})
export class AppModule {}
