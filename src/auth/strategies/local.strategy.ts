import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '../auth.controller';
import * as bcrypt from 'bcrypt';

export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private prismaService: PrismaService) {
    super();
  }

  async validate(username: string, pass: string): Promise<any> {
    const user = (await this.prismaService.user.findUnique({
      where: { username },
    })) as unknown as User;

    if (!user) {
      throw new UnauthorizedException();
    }
    const hashedPassword = user.password;
    if (!(await bcrypt.compare(pass, hashedPassword))) {
      throw new UnauthorizedException();
    }
    const { password, ...rest } = user;
    return rest;
  }
}
