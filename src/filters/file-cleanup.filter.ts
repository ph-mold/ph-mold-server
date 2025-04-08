import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { safeUnlink } from 'src/utils/safe-unlink';

@Catch(HttpException)
export class FileCleanupFilter implements ExceptionFilter {
  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    await safeUnlink(req.file?.path);

    const status = exception.getStatus();
    const message = exception.getResponse();

    res
      .status(status)
      .json(
        typeof message === 'string' ? { statusCode: status, message } : message,
      );
  }
}
