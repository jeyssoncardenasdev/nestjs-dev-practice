import { HttpException, HttpStatus } from '@nestjs/common';

export class AppException extends HttpException {
  public technicalMessage?: string;

  constructor(
    userMessage: string,
    technicalMessage: string | null = null,
    statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    super(userMessage, statusCode);
    this.technicalMessage = technicalMessage ?? undefined;

    Error.captureStackTrace(this, this.constructor);
  }
}
