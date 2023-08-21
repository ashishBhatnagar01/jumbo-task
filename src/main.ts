import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionHandler } from '../core/exception-handlers/global-exception-handler';
import { PrismaService } from '../services/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionHandler());
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
