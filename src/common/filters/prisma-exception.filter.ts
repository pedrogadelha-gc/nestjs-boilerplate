import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'An unexpected error occurred, please contact support.';

    switch (exception.code) {
      case 'P2002': // Unique constraint failed
        statusCode = HttpStatus.CONFLICT;
        message = `Unique constraint violation: ${exception.meta?.target}`;
        break;
      case 'P2025': // Record not found
        statusCode = HttpStatus.NOT_FOUND;
        message = 'Record not found';
        break;
      // Handle other Prisma error codes as needed
      default:
        statusCode = HttpStatus.BAD_REQUEST;
        message = exception.message;
        break;
    }

    response.status(statusCode).json({
      statusCode,
      message,
      error: exception.code,
    });
  }
}
