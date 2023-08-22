import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { users } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MessageService } from '../../services/message.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly messageService: MessageService,
  ) {}
  async createUser(body): Promise<users> {
    body.password = await this.hashPassword(body.password);
    const user = await this.prisma.users.create({
      data: body,
    });
    delete user.password;
    user['access_token'] = await this.jwtService.signAsync(user);
    return user;
  }

  async login(body): Promise<users> {
    const user = await this.prisma.users.findFirst({
      where: {
        email: body.email,
      },
    });
    const isSamePassword = await bcrypt.compare(body.password, user.password);
    if (!isSamePassword)
      throw new HttpException(this.messageService.INVALID_CREDENTIALS, 401);
    delete user.password;
    user['access_token'] = await this.jwtService.signAsync(user);
    return user;
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }
}
