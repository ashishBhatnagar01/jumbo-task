import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, LoginDto } from './dto/auth.dto';
import { BaseController } from '../../core/controller/base.controller';
import { MessageService } from '../../services/message.service';
import { ResponseInterface } from '../../core/interfaces/interfaces';

@Controller('auth')
export class AuthController extends BaseController {
  constructor(
    private readonly authService: AuthService,
    private readonly messageService: MessageService,
  ) {
    super();
  }

  @Post('signup')
  async signup(@Body() body: AuthDto): Promise<ResponseInterface> {
    return this.standardResponse(
      await this.authService.createUser(body),
      this.messageService.REGISTRATION_SUCCESSFUL,
    );
  }

  @Post('login')
  async login(@Body() body: LoginDto): Promise<ResponseInterface> {
    return this.standardResponse(
      await this.authService.login(body),
      this.messageService.LOGGED_IN,
    );
  }
}
