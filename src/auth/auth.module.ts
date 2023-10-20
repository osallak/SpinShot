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
import { JwtStrategy } from './strategies/jwt.stategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: JWT_SECRET,

      signOptions: { expiresIn: '100d'},
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    UserService,
    LocalStrategy,
    FortyTwoStrategy,
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
