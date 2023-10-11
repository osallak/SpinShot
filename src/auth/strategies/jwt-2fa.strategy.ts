import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { JwtAuthPayload } from '../interfaces/jwt.interface';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtTwoFaStrategy extends PassportStrategy(Strategy, 'jwt-2fa') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
  }

  async validate(
    payload: JwtAuthPayload,
  ): Promise<{ id: string; username: string; email: string }> {
    const { iat, exp, sub } = payload;

    const timeDiff = exp - iat;

    if (timeDiff <= 0) throw new UnauthorizedException();

    const user = await this.userService.findOneById(sub);

    if (!user) throw new UnauthorizedException();

    if (!user.twoFactorAuth) {
      return {
        id: user.id,
        username: user.username,
        email: user.email,
      };
    }

    if (payload.isTwoFaAuthenticated) {
      return {
        id: user.id,
        username: user.username,
        email: user.email,
      };
    }
  }
}
