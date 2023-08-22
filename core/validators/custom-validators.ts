import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from '@nestjs/class-validator';
import { PrismaService } from '../../services/prisma.service';
import { MessageService } from '../../services/message.service';

const prisma = new PrismaService();
const messageService = new MessageService();

@ValidatorConstraint({ name: 'IsUnique', async: true })
export class IsUnique implements ValidatorConstraintInterface {
  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const doesUserExist = await prisma.users.findFirst({
      where: {
        email: value,
      },
    });
    if (doesUserExist) return false;
    return true;
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    return messageService.ALREADY_REGISTERED;
  }
}

@ValidatorConstraint({ name: 'IsExist', async: true })
export class IsExist implements ValidatorConstraintInterface {
  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const user = await prisma.users.findFirst({
      where: {
        email: value,
      },
    });
    if (!user) return false;
    return true;
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    return messageService.EMAIL_NOT_REGISTERED;
  }
}
