import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    JwtService,
  ],
  imports: [
    JwtModule.register({
      secret: 'secret',
    }),
  ],
})
export class AuthModule {}
