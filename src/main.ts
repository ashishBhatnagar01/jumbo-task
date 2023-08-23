import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionHandler } from '../core/exception-handlers/global-exception-handler';
import { PrismaService } from '../services/prisma.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const port = process.env.PORT || 8081;
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionHandler());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(port, '0.0.0.0').then(() => {
    console.log(`App is running on ${port}`);
  });
}
bootstrap();
