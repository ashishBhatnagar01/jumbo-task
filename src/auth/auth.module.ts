import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../../services/prisma.service';
import { MessageService } from '../../services/message.service';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'process';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, MessageService],
})
export class AuthModule {}
