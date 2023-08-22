import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch()
export class GlobalExceptionHandler implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    console.log(exception)
    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;
    let message = ['Ooops! Something went wrong!!'];
    if (exception instanceof HttpException) {
      const httpException = exception.getResponse();
      message = httpException['message']
        ? httpException['message']
        : [exception.message];
    } else if (exception instanceof TypeError) {
      message = [exception.message];
    }
    response.status(status).json({
      status: status,
      message: message,
    });
  }
}
