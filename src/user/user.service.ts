import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto';
import * as bcrypt from 'bcrypt';
import { DEFAULT_AVATAR } from 'src/global/constants/global.constants';
import { Prisma, UserStatus, haveAchievement } from '@prisma/client';
import { initUserLogs } from './helpers';
import { v4 as uuidv4 } from 'uuid';
import { achievements } from './constants';
import { serializePaginationResponse, serializeUser } from './helpers';
import { PaginationQueryDto } from 'src/global/dto/pagination-query.dto';
import {
  PaginationResponse,
  Response,
} from 'src/global/interfaces/global.intefraces';
import { UpdateUserDto } from './dto/update-user.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { SerialisedUser, User } from 'src/types';
import { serializeService } from 'src/global/services';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { SearchDto } from './dto/search.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger('UserService');
  constructor(private prisma: PrismaService, mailer: MailerService) {}

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  async findOneById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  async findOneByUsername(username: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });
    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  async findOneByEmailOrUsername(
    email: string,
    username: string,
  ): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });
    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  async initAcheivements(user: any): Promise<any> {
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
    let hashedPassword: string;
    try {
      const salt: string = await bcrypt.genSalt(10); //? does it return a string ?
      hashedPassword = await bcrypt.hash(data.password, salt);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException();
    }
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
    const haveAchievement: haveAchievement = await this.initAcheivements(user);
    if (!user || !haveAchievement) throw new InternalServerErrorException();
    const { password, ...rest } = data;
    return rest;
  }

  async signIn(username: string, pass: string): Promise<User> {
    const user = await this.prisma.user.update({
      where: { username: username },
      data: { status: UserStatus.ONLINE }, //todo: to be discussed
    });
    if (!user) throw new NotFoundException('User not found');
    if (!user.mailVerified) throw new BadRequestException('Email not verified');
    try {
      if (!(await bcrypt.compare(pass, user.password)))
        throw new BadRequestException('Invalid credentials');
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
    }
    return user;
  }

  async deleteUser(user: any): Promise<void> {
    //todo: delete user's achievements as well as his logs
    await this.prisma.user.delete({
      where: {
        id: user.id,
      },
      include: {
        logs: true,
        HaveAchievement: {
          include: {
            Achiement: true,
          },
        },
      },
    });
  }

  async verifyEmail(email: string, reject: boolean): Promise<boolean> {
    const user: User = await this.findOneByEmail(email);
    if (!user) throw new  NotFoundException('user not found');

    if (user.mailVerified) throw new BadRequestException('Link already used');

    if (!reject) {
      //
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

    const createUser: User = await this.prisma.user.create({
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
      return await this.prisma.user.update({
        where: { email: profile.email },
        data: {
          is42User: true,
          firstName: profile.firstName,
          lastName: profile.lastName,
          avatar: profile.avatar,
          status: UserStatus.ONLINE, //todo: check this
          country: profile.country,
        },
      });
  }

  async getUser(id: string): Promise<SerialisedUser> {
      const user: User = await this.prisma.user.findUnique({
        where: {
          id,
        },
        include: {
          logs: {
            select: {
              victories: true,
              defeats: true,
              level: true,
              rank: true,
            },
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
      if (!user) throw new NotFoundException('record not found !');
      return serializeUser(user);
  }

  async getUserGames(
    id: string,
    query: PaginationQueryDto,
  ): Promise<PaginationResponse<any>> {
    const { limit } = query;
    const [games, totalCount] = await this.prisma.$transaction([
      this.prisma.game.findMany({
        skip: query.getSkip(),
        take: limit,
        where: {
          OR: [{ userId: id }, { opponentId: id }],
        },
      }),
      this.prisma.game.count({
        where: {
          OR: [{ userId: id }, { opponentId: id }],
        }
      }),
    ]);
    return serializePaginationResponse(games, totalCount, limit);
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
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
    };
  }

  async updateAvatar(id: string, publicUrl: string): Promise<User> {
    return await this.prisma.user.update({
      where: { id },
      data: { avatar: publicUrl },
    });
  }

  async search(query: SearchDto): Promise<PaginationResponse<User[]>> {
    const where = {
         username: { startsWith: query.keyword },
    };
    const [users, totalCount] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where,
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          email: true,
          avatar: true,
        },
        orderBy: {
          username: query.orderBy,
        },
        skip: query.getSkip(),
        take: query.limit,
      }),
      this.prisma.user.count({ where }),
    ]);
    return serializeService.serializePaginationResponse(
      users,
      totalCount,
      query.limit,
    );
  }

  async updateData(id: string, data: object): Promise<User | Response> {
    return new Promise(async (resolve, reject) => {
      try {
        const user: User = await this.prisma.user.update({
          where: { id },
          data: data,
        });
        return resolve({
          status: 200,
          message: 'User updated',
          data: {
            user,
          },
        });
      } catch {
        return reject({
          status: 500,
          message: 'Internal Server Error',
        });
      }
    });
  }

	async registerFortyTwoUser(user: any): Promise<any> {
    //add data validation

    const generatedUsername = 'user' + '_' + uuidv4().slice(0, 8);

    user = await this.prisma.user.upsert({
      where: { email: user.email },
      update: {
        firstName: user.firstName,
        lastName: user.lastName,
        is42User: true,
        username: generatedUsername,
        avatar: user.avatar,
        country: user.country,
      },
      create: {
        username: generatedUsername,
        email: user.email,
        avatar: user.avatar,
        firstName: user.firstName,
        lastName: user.lastName,
        is42User: true,
        status: UserStatus.OFFLINE,
        country: user.country,
        mailVerified: true,
        logs: {
          create: initUserLogs(),
        },
      },
    });
    return user;
	}
}
