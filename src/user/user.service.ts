import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
//import bcrypt
import * as bcrypt from 'bcrypt';
import { UserStatus } from '@prisma/client';
import { DEFAULT_AVATAR } from 'src/global/global.constants';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findOneById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findOneByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async create(data: CreateUserDto) {
    let user: any =  await this.findOneByUsername(data.username);
    if (user) {
        return (new ForbiddenException('Username already exists'));
    }
    user = await this.findOneByEmail(data.email);
    if (user) {
        return (new ForbiddenException('Email already exists'));
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    user = await this.prisma.user.create({
        data: {
            email: data.email,
            username: data.username,
            password: hashedPassword,
            status: UserStatus.OFFLINE,
            avatar: DEFAULT_AVATAR,
        }
    });
    const { password, ...rest } = data;
    return rest;
    // return 'ok';
  }
}
