import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JWT_SECRET } from 'src/global/constants/global.constants';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FortyTwoStrategy } from './strategies/fortyTwo.strategy';
import { TwoFactorAuthService } from './two-factor-auth.service';
import { TwoFactorAuthController } from './two-factor-auth.controller';
import { JwtTwoFaStrategy } from './strategies/jwt-2fa.strategy';
import { JwtStrategy, LocalStrategy } from './strategies';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: JWT_SECRET,

      signOptions: { expiresIn: '1d' },
    }),
    PassportModule,
  ],
  controllers: [AuthController, TwoFactorAuthController],
  providers: [
    AuthService,
    PrismaService,
    UserService,
    LocalStrategy,
    FortyTwoStrategy,
    JwtStrategy,
    TwoFactorAuthService,
    JwtTwoFaStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
