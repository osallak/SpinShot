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
import { Prisma, UserStatus, haveAchievement } from '@prisma/client';
import { initUserLogs } from './helpers';
import { v4 as uuidv4 } from 'uuid';
import { achievements } from './constants';
import { serializePaginationResponse, serializeUser } from './helpers';
import { PaginationQueryDto } from 'src/global/dto/pagination-query.dto';
import { PaginationResponse } from 'src/global/interfaces/global.intefraces';
import { UpdateUserDto } from './dto/update-user.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { SerialisedUser } from 'src/types';
import { User } from 'src/types';

@Injectable()
export class UserService {
  private readonly logger = new Logger('UserService');
  constructor(private prisma: PrismaService, mailer: MailerService) {}

  async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.prisma.user.findUnique({
        where: { email },
      });
    } catch (error) {
      this.logger.error(error.message);
      return null;
    }
  }

  async findOneById(id: string): Promise<User> {
    try {
      return await this.prisma.user.findUnique({
        where: { id },
      });
    } catch (error) {
      this.logger.error(error.message);
      return null;
    }
  }

  async findOneByUsername(username: string): Promise<User> {
    try {
      return await this.prisma.user.findUnique({
        where: { username },
      });
    } catch (error) {
      this.logger.error(error.message);
      return null;
    }
  }

  async findOneByEmailOrUsername(
    email: string,
    username: string,
  ): Promise<User> {
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

  async createUser(data: CreateUserDto): Promise<User> {
    try {
      const salt: string = await bcrypt.genSalt(10); //? does it return a string ?
      const hashedPassword: string = await bcrypt.hash(data.password, salt);
      const user: User = await this.prisma.user.create({
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

      const haveAchievement: haveAchievement = await this.initAcheivements(
        user,
      );
      if (!user || !haveAchievement) throw new InternalServerErrorException();
      const { password, ...rest } = data;
      return rest;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError)
        throw new BadRequestException('Invalid data');
      if (error instanceof ConflictException)
        throw new ConflictException('User already exists');
      throw new InternalServerErrorException();
    }
  }

  async signIn(username: string, pass: string): Promise<User> {
    try {
      const user = await this.prisma.user.update({
        where: { username: username },
        data: { status: UserStatus.ONLINE }, //todo: to be discussed
      });
      if (!user.mailVerified)
        throw new BadRequestException('Email not verified');
      if (!(await bcrypt.compare(pass, user.password)))
        throw new BadRequestException('Invalid credentials');
      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new NotFoundException('User not found');
      } else if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async deleteUser(user: any): Promise<void> {
    //todo: delete user's achievements as well as his logs
    await this.prisma.user.delete({
      where: {
        id: user.id,
      },
    });
  }

  async verifyEmail(email: string, reject: boolean): Promise<boolean> {
    const user: User = await this.findOneByEmail(email);
    if (!user) throw new BadRequestException('Invalid email');

    if (user.mailVerified) throw new BadRequestException('Link already used');

    if (!reject) {
      const retUser = await this.prisma.user.update({
        where: { email: user.email },
        data: { mailVerified: true },
      });
      return retUser ? true : false;
    }
    if (user.is42User) return false;
    await this.deleteUser(user);
    return true;
  }

  async create42User(data: any): Promise<User> {
    const user = await this.findOneByUsername(data.username);
    if (user) data.username = 'user' + '_' + uuidv4().slice(0, 8);

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

  async mergeAccounts(profile: any): Promise<User> {
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
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException('Invalid credentials');
      }
      throw new InternalServerErrorException();
    }
  }

  async getUser(username: string): Promise<SerialisedUser> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          username,
        },
        include: {
          logs: {
            select: {
              victories: true,
              defeats: true,
              level: true,
              rank: true,
            }
          },
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
      if (!user) throw new NotFoundException('Invalid username');
      return serializeUser(user);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async getUserGames(
    username: string,
    query: PaginationQueryDto,
  ): Promise<PaginationResponse<any>> {
    const { limit } = query;
    try {
      const user: User = await this.findOneByUsername(username);
      if (!user) throw new NotFoundException();
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
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        throw new NotFoundException('User not found');
      }
      throw new InternalServerErrorException();
    }
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    try {
      if (data.password) {
        const salt: string = (await bcrypt.genSalt(10)) as string;
        data.password = (await bcrypt.hash(data.password, salt)) as string;
      }
      const user: User = await this.prisma.user.update({
        where: { id },
        data,
      });
      return {
        username: user.username,
        email: user.email,
      } as User;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException('Invalid data');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async updateAvatar(id: string, publicUrl: string): Promise<User> {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: { avatar: publicUrl },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('User not found');
      }
      throw new InternalServerErrorException();
    }
  }
}
