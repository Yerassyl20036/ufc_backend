import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const status = 
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = 
      exception instanceof HttpException
        ? exception.message
        : 'Internal server error';

    return {
      statusCode: status,
      message: message,
      timestamp: new Date().toISOString(),
    };
  }
}