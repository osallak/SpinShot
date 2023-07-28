import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from '../auth.service';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    private prismaService: PrismaService,
    private readonly authService: AuthService,
  ) {
    super();
  }

  async validate(username: string, pass: string): Promise<any> {
    // this.logger.verbose('entered: (validate local)');
    const accessToken: string = await this.authService.signIn(username, pass);

    if (!accessToken) {
      throw new UnauthorizedException();
    }

    return accessToken;
  }
}
