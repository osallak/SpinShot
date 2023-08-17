import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { DEFAULT_AVATAR } from 'src/global/constants/global.constants';
import { Prisma, UserStatus } from '@prisma/client';
import { initUserLogs } from './helpers';
import { v4 as uuidv4 } from 'uuid';
import { achievements } from './constants';
import { serializePaginationResponse, serializeUser } from './helpers';
import { PaginationQueryDto } from 'src/global/dto/pagination-query.dto';
import { PaginationResponse } from 'src/global/interfaces/global.intefraces';
import { UpdateUserDto } from './dto/update-user.dto';
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
  constructor(private prisma: PrismaService, mailer: MailerService) {}

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

  async initAcheivements(user: any): Promise<any> {
    if (!user) throw new BadRequestException();

    await this.prisma.achievement.createMany({
      data: [
        {
          name: achievements[0].name,
          description: achievements[0].description,
        },
        {
          name: achievements[1].name,
          description: achievements[1].description,
        },
        {
          name: achievements[2].name,
          description: achievements[2].description,
        },
        {
          name: achievements[3].name,
          description: achievements[3].description,
        },
      ],
    });
    const achievs = await this.prisma.achievement.findMany();
    if (!achievs) throw new InternalServerErrorException();

    return await this.prisma.haveAchievement.createMany({
      data: [
        { userId: user.id, achievementId: achievs[0].id, level: 0.0 },
        { userId: user.id, achievementId: achievs[1].id, level: 0.0 },
        { userId: user.id, achievementId: achievs[2].id, level: 0.0 },
        { userId: user.id, achievementId: achievs[3].id, level: 0.0 },
      ],
    });
  }

  async createUser(data: CreateUserDto): Promise<any> {
    let user: any = await this.findOneByEmailOrUsername(
      data.email,
      data.username,
    );

    if (user) throw new ConflictException('User already exists');

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

    const haveAchievement = await this.initAcheivements(user);
    if (!user || !haveAchievement) throw new InternalServerErrorException();
    const { password, ...rest } = data;
    return rest;
  }

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.findOneByUsername(username);

    if (!user) throw new NotFoundException('User not found');
    if (!user.mailVerified || !(await bcrypt.compare(pass, user.password)))
      throw new BadRequestException('Email not verified');

    await this.prisma.user.update({
      where: { username: user.username },
      data: { status: UserStatus.ONLINE }, //todo: to be discussed
    });
    return user;
  }

  async deleteUser(user: any): Promise<any> {
    return await this.prisma.user.delete({
      where: {
        id: user.id,
      },
    });
  }

  async verifyEmail(email: string, reject: boolean): Promise<boolean> {
    const user = await this.findOneByEmail(email);
    if (!user) throw new BadRequestException('Invalid email');

    if (user.mailVerified) throw new BadRequestException('Link already used');

    if (!reject) {
      const retUser = await this.prisma.user.update({
        where: { email: user.email },
        data: { mailVerified: true },
      });
      return retUser ? true : false;
    }
    if (user.is42User) return null;
    return await this.deleteUser(user);
  }

  async create42User(data: any): Promise<any> {
    const user = await this.findOneByUsername(data.username);
    if (user) data.username = 'user' + '_' + uuidv4().slice(0, 8); //todo: check this

    const createUser = await this.prisma.user.create({
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
    if (!createUser) throw new InternalServerErrorException();
    const haveAchievement = await this.initAcheivements(createUser);
    if (!haveAchievement) throw new InternalServerErrorException();
    return createUser;
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

  async getUser(username: string): Promise<any> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          username,
        },
        include: {
          logs: true,
          HaveAchievement: {
            select: {
              level: true,
              Achiement: {
                select: {
                  name: true,
                  description: true,
                },
              },
            },
          },
        },
      });
      if (!user) throw new BadRequestException('Invalid username');
      return serializeUser(user);
    } catch (e) {
      this.logger.error(e.message);
      throw e;
    }
  }

  async getUserGames(
    username: string,
    query: PaginationQueryDto,
  ): Promise<PaginationResponse<any>> {
    const { limit } = query;
    const user = await this.findOneByUsername(username);
    if (!user) throw new NotFoundException('User not found');

    try {
      const [games, totalCount] = await this.prisma.$transaction([
        this.prisma.game.findMany({
          skip: query.getSkip(),
          take: limit,
          where: {
            OR: [
              {
                userId: user.id,
              },
              {
                opponentId: user.id,
              },
            ],
          },
        }),
        this.prisma.game.count(),
      ]);
      return serializePaginationResponse(games, totalCount, limit);
    } catch (e) {
      this.logger.error(e.message);
      throw new InternalServerErrorException();
    }
  }

  async update(username: string, data: UpdateUserDto): Promise<any> {
    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
    }

    try {
      return await this.prisma.user.update({
        where: { username },
        data,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException('Invalid data');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async updateAvatar(username: string, publicUrl: string): Promise<any> {
    try {
      return await this.prisma.user.update({
        where: { username },
        data: { avatar: publicUrl },
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException();
    }
  }
}
