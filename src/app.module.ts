import { AuthenticationController } from './features/authentication/presentation/authentication.controller';
import { SharedModule } from './shared/shared.module';
import { AuthenticationModule } from './features/authentication/authentication.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './shared/presentation/filters/domain-exception.filter';
import { LoggerAdapter } from './shared/domain/logging/LoggerAdapter';
@Module({
  imports: [SharedModule, AuthenticationModule],
  controllers: [
        AuthenticationController, AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    }]  
})
export class AppModule {}
