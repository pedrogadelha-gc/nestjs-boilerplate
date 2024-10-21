import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { ZodError } from 'zod';

@Catch(ZodError)
export class ZodExceptionFilter implements ExceptionFilter {
  catch(exception: ZodError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const details = exception.errors.map((error) => {
      return {
        message: error.message,
        path: error.path,
      };
    });

    const status = HttpStatus.BAD_REQUEST;
    const message = 'Validation failed';

    response.status(status).json({
      status,
      details,
      message,
    });
  }
}
