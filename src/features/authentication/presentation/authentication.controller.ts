import { Controller, Get, HttpStatus, Inject, Version } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiResult } from 'src/shared/application/dto/response-dto';
import { ILogAdapter } from 'src/shared/domain/logging/interface/log-adapter.interface.ts';

@Controller('auth')
export class AuthenticationController {
  constructor(@Inject('ILogAdapter') private readonly logger: ILogAdapter) {}

  @Get('token/generate')
  @Version('1')
  @ApiOperation({ summary: 'Generar token de autenticación' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Token generado correctamente',   
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'No autorizado' })
  GetV1() {
    const response = {
      prueba: 1,
    };

    this.logger.log(`AuthenticationController - Response: ${JSON.stringify(response)}`);
    return ApiResult.ok(response, HttpStatus.CREATED);
  }

  @Get()
  @Version('2')
  getV2() {
    return 'Hola desde la versión 2';
  }
}
