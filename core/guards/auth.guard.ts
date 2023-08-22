import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import * as process from 'process';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);
    if (!token) {
      throw new HttpException('Unauthorized access', 401);
    }
    const data = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
    request['user'] = data;
    return true;
  }

  private extractToken(request: Request): string | undefined {
    const token = request.headers.authorization?.split(' ')[1] ?? '';
    return token ? token : undefined;
  }
}
