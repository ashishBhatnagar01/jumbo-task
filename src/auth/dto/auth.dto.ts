import {
  IsEmail,
  IsNotEmpty,
  Validate,
} from '@nestjs/class-validator';
import { IsExist, IsUnique } from "../../../core/validators/custom-validators";
import { MessageService } from '../../../services/message.service';
const messageService = new MessageService();

export class AuthDto {
  @IsNotEmpty()
  @Validate(IsUnique)
  @IsEmail({}, { message: messageService.INVALID_EMAIL })
  email: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  first_name: string;
  @IsNotEmpty()
  last_name: string;
}

export class LoginDto {
  @IsNotEmpty()
  @IsEmail({}, { message: messageService.INVALID_EMAIL })
  @Validate(IsExist)
  email: string;
  @IsNotEmpty()
  password: string;
}
