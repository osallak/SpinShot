import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { DEFAULT_AVATAR } from 'src/global/global.constants';
import { UserStatus } from '@prisma/client';
import { log } from 'console';
import { MailerService } from '@nestjs-modules/mailer';

export type User = {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  uesrname: string;
  password: string;
  avatar?: string;
  country?: string;
  twoFactorAuth: boolean;
  status: UserStatus;
};

@Injectable()
export class UserService {
  private readonly logger = new Logger('UserService');
  constructor(private prisma: PrismaService,
    private mailer: MailerService) {}

  async findOneByEmail(email: string) {
    try {
      return await this.prisma.user.findUnique({
        where: { email },
      });
    } catch (e) {
      this.logger.error(e.message);
      throw new InternalServerErrorException();
    }
  }

  async findOneById(id: string) {
    try {
      return await this.prisma.user.findUnique({
        where: { id },
      });
    } catch (e) {
      this.logger.error(e.message);
      throw new InternalServerErrorException();
    }
  }

  async findOneByUsername(username: string) {
    try {
      return await this.prisma.user.findUnique({
        where: { username },
      });
    } catch (e) {
      this.logger.error(e.message);
      throw new InternalServerErrorException();
    }
  }

  async signUp(data: CreateUserDto): Promise<any> {
    console.log('entered signup');
    let user: any = await this.findOneByUsername(data.username);
    if (user) {
      throw new ForbiddenException('Username already exists');
    }
    user = await this.findOneByEmail(data.email);
    if (user) {
      throw new ForbiddenException('Email already exists');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    user = await this.prisma.user.create({
      data: {
        email: data.email,
        username: data.username,
        password: hashedPassword,
        status: UserStatus.ONLINE, //? check if this is the best way to do this
        avatar: DEFAULT_AVATAR,
      },
    });

    await this.mailer.sendMail({
      to: data.email,
      subject: 'Welcome to Chat App',
      template: './welcome',
      context: {
        username: data.username,
      },
    });
    const { password, ...rest } = data;
    return rest;
  }

  async signIn(username: string, pass: string): Promise<any> {
    //TODO: change user status to online
    const user = await this.findOneByUsername(username);
    if (!user || !user.password || !(await bcrypt.compare(pass, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }

    return user;
  }
}
