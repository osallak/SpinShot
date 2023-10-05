import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/global/constants/global.constants';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.stategy';
import { FortyTwoStrategy } from './strategies/fortyTwo.strategy';
import { TwoFactorAuthService } from './two-factor-auth.service';
import { TwoFactorAuthController } from './two-factor-auth.controller';
import { JwtTwoFaStrategy } from './strategies/jwt-2fa.strategy';

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
