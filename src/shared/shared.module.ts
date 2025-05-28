import { Module } from '@nestjs/common';
import { LoggerAdapter } from './domain/logging/LoggerAdapter';

@Module({
  providers: [
    {
      provide: 'ILogAdapter',
      useClass: LoggerAdapter,
    },
  ],
  exports: ['ILogAdapter']
})
export class SharedModule {}
