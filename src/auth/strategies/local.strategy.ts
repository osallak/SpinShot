import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtResponse } from 'src/types';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    private prismaService: PrismaService,
    private readonly authService: AuthService,
  ) {
    super();
  }

  async validate(username: string, pass: string): Promise<JwtResponse> {
    const accessToken: JwtResponse = await this.authService.signIn(
      username,
      pass,
      false,
    );
    if (!accessToken) throw new UnauthorizedException();

    return accessToken;
  }
}
