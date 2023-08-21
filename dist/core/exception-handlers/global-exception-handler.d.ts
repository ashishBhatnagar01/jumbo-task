import { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
export declare class GlobalExceptionHandler implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): any;
}
