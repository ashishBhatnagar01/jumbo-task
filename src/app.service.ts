import { Injectable } from '@nestjs/common';
import { PrismaService } from "../services/prisma.service";
const prisma = new PrismaService();
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
