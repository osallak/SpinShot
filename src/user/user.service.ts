import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { DEFAULT_AVATAR } from 'src/global/global.constants';
import { UserStatus } from '@prisma/client';
import { MailerService } from '@nestjs-modules/mailer';
import { JwtService } from '@nestjs/jwt';
import { hashPassword, initUserLogs } from './helpers';
import { v4 as uuidv4 } from 'uuid';
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
  constructor(
    private prisma: PrismaService,
    private mailer: MailerService,
    private jwtService: JwtService,
  ) {}

  async findOneByEmail(email: string) {
    try {
      return await this.prisma.user.findUnique({
        where: { email },
      });
    } catch (error) {
      this.logger.error(error.message);
      return null;
    }
  }

  async findOneById(id: string) {
    try {
      return await this.prisma.user.findUnique({
        where: { id },
      });
    } catch (error) {
      this.logger.error(error.message);
      return null;
    }
  }

  async findOneByUsername(username: string) {
    try {
      return await this.prisma.user.findUnique({
        where: { username },
      });
    } catch (error) {
      this.logger.error(error.message);
      return null;
    }
  }

  async findOneByEmailOrUsername(email: string, username: string) {
    try {
      return await this.prisma.user.findFirst({
        where: {
          OR: [{ email }, { username }],
        },
      });
    } catch (error) {
      this.logger.error(error.message);
      return null;
    }
  }

  async signUp(data: CreateUserDto): Promise<any> {
    let user: any = await this.findOneByEmailOrUsername(
      data.email,
      data.username,
    );

    if (user) throw new BadRequestException('User already exists');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    user = await this.prisma.user.create({
      data: {
        email: data.email,
        username: data.username,
        password: hashedPassword,
        status: UserStatus.OFFLINE,
        avatar: DEFAULT_AVATAR,
        is42User: false,
        logs: {
          create: initUserLogs(),
        },
      },
    });

    if (!user) {
      throw new InternalServerErrorException();
    }
    const { password, ...rest } = data;
    return rest;
  }

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.findOneByUsername(username);
    if (
      !user ||
      !user.password ||
      !(await bcrypt.compare(pass, user.password))
    ) {
      throw new BadRequestException('Invalid credentials');
    }

    await this.prisma.user.update({
      where: { username: user.username },
      data: { status: UserStatus.ONLINE },
    });
    return user;
  }

  async verifyEmail(email: string): Promise<boolean> {
    const user = await this.findOneByEmail(email);
    if (!user) {
      throw new BadRequestException('Invalid email');
    }

    if (user.mailVerified) {
      throw new BadRequestException('Email already verified');
    }
    await this.prisma.user.update({
      where: { email: user.email },
      data: { mailVerified: true },
    });
    return true;
  }

  async create42User(data: any): Promise<any> {
    const user = await this.findOneByUsername(data.username);
    if (user) data.username = data.username + '_' + uuidv4().slice(0, 6);//todo: check this

    return await this.prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        avatar: data.avatar,
        firstName: data.firstName,
        lastName: data.lastName,
        is42User: true,
        status: UserStatus.OFFLINE,
        country: data.country,
        mailVerified: true,
        logs: {
          create: initUserLogs(),
        },
      },
    });
  }

  async mergeAccounts(profile: any): Promise<any> {
    const user = this.findOneByEmail(profile.email);
    if (!user) throw new BadRequestException('Invalid email');

    try {
      return await this.prisma.user.update({
        where: { email: profile.email },
        data: {
          is42User: true,
          firstName: profile.firstName,
          lastName: profile.lastName,
          avatar: profile.avatar, 
          status: UserStatus.ONLINE,
          country: profile.country,
        },
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException();
    }
  }
}