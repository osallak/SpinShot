import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private userService: UserService,
    private readonly configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload): Promise<any> {
    const { iat, expt } = payload;
    const timeDiff = expt - iat;
    if (timeDiff <= 0) throw new UnauthorizedException();
    const user = await this.userService.findOneById(payload.sub);
    if (!user) throw new UnauthorizedException();
    return {
      id: user.id,
      username: user.username,
      email: user.email,
    };
  }
}
