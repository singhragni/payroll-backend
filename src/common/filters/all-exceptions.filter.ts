import { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import {Response} from 'express'
export class AllExceptionsFilter implements ExceptionFilter{
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.status || 500;
        const message = exception.message || 'Internal server error';

        response.status(status).json({
                statusCode: status,
                message,
                error: exception.name || 'Unknown error'
        });
    }
}