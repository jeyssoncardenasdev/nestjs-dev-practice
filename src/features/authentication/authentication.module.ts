import { Module } from '@nestjs/common';
import { AuthenticationController } from './presentation/authentication.controller';
import { SharedModule } from 'src/shared/shared.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SharedModule,
    JwtModule.register({
      secret: 'miClaveSecretaSuperSegura',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [],
})
export class AuthenticationModule {}
