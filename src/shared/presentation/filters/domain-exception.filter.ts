import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ILogAdapter } from 'src/shared/domain/logging/interface/log-adapter.interface.ts';
import { ApiResult, ErrorResponseDto } from 'src/shared/application/dto/response-dto'; // Ajusta la ruta según tu proyecto

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(@Inject('ILogAdapter') private readonly logger: ILogAdapter) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
  
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let userMessage: string[] = ['Internal server error'];
    let technicalCode: string | undefined = undefined;

    if (exception instanceof HttpException) {
      const res = exception.getResponse();
      if (typeof res === 'string') {
        userMessage = [res];
      } else if (typeof res === 'object' && res !== null) {
        if ('message' in res) {
          if (Array.isArray(res['message'])) {
            userMessage = res['message'];
          } else if (typeof res['message'] === 'string') {
            userMessage = [res['message']];
          }
        } else {         
          userMessage = ['Error'];
        }
      }      
    } else if (exception instanceof Error) {
      userMessage = [exception.message];
      technicalCode = 'COD_02523';
    }
   
    const errorMsg = exception instanceof Error ? exception.message : 'Unknown error';
    const errorStack = exception instanceof Error ? exception.stack : '';
    this.logger.error(errorMsg, errorStack, 'AllExceptionsFilter');
   
    const errorDto = new ErrorResponseDto({   
      userMessage,
      technicalCode,
      timestamp: new Date().toISOString(),
      path: request.url,
    });    
    response.status(status).json(ApiResult.fail(errorDto, status));
  }
}
