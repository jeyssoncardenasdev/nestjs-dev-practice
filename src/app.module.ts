import { AuthenticationModule } from './features/authentication/authentication.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [AuthenticationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
