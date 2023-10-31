import { MailerService } from '@nestjs-modules/mailer';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { UserStatus, haveAchievement } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { DEFAULT_AVATAR } from 'src/global/constants/global.constants';
import { PaginationQueryDto } from 'src/global/dto/pagination-query.dto';
import {
  PaginationResponse,
  Response,
} from 'src/global/interfaces/global.intefraces';
import { serializeService } from 'src/global/services';
import { SerialisedUser, User } from 'src/types';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../prisma/prisma.service';
import { achievements } from './constants';
import { CreateUserDto } from './dto';
import { SearchDto } from './dto/search.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  initUserLogs,
  serializePaginationResponse,
  serializeUser,
} from './helpers';

@Injectable()
export class UserService {
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
    const alreadyCreated = await this.prisma.achievement.findMany({
      where: {
        OR: [
          { name: achievements[0].name },
          { name: achievements[1].name },
          { name: achievements[2].name },
          { name: achievements[3].name },
        ],
      },
    });
    if (!alreadyCreated || alreadyCreated.length === 0) {
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
    }
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
        mailVerified: true,
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
    const user = await this.prisma.user.findUnique({
      where: { username },
    });
    if (!user) throw new NotFoundException('User not found');
    if (!user.mailVerified) throw new BadRequestException('Email not verified');
    if (!user.password) throw new BadRequestException('Invalid credentials');
    try {
      if (!(await bcrypt.compare(pass, user.password)))
        throw new BadRequestException('Invalid credentials');
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
    }
    return user;
  }

  async deleteUser(user: any): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id: user.id,
      },
      include: {
        logs: true,
        HaveAchievement: {
          include: {
            Achivement: true,
          },
        },
      },
    });
  }

  async verifyEmail(email: string, reject: boolean): Promise<boolean> {
    const user: User = await this.findOneByEmail(email);
    if (!user) throw new NotFoundException('user not found');

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

  public async create42User(data: any): Promise<User> {
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
        HaveAchievement: {
          orderBy: {
            Achivement: {
              name: 'asc',
            },
          },
          select: {
            level: true,
            achieved: true,
            Achivement: {
              select: {
                name: true,
                description: true,
              },
            },
          },
        },
        logs: true,
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
    let wins = 0,
      loses = 0;
    const userMatches = await this.prisma.game.findMany({
      where: {
        OR: [{ userId: id }, { opponentId: id }],
      },
      select: {
        userId: true,
        History: {
          select: {
            userId: true,
            opponentId: true,
            userScore: true,
            opponentScore: true,
          },
        },
      },
    });
    userMatches.forEach((match) => {
      if (match.userId === id) {
        if (match.History?.userScore > match.History?.opponentScore) {
          wins++;
        } else {
          loses++;
        }
      } else {
        if (match.History?.userScore > match.History?.opponentScore) {
          loses++;
        } else {
          wins++;
        }
      }
    });
    const [games, totalCount]: any = await this.prisma.$transaction([
      this.prisma.game.findMany({
        skip: query.getSkip(),
        take: limit,
        where: {
          OR: [{ userId: id }, { opponentId: id }],
        },
        include: {
          History: {
            select: {
              userScore: true,
              opponentScore: true,
            },
          },
          user: { include: { logs: true } },
          opponent: { include: { logs: true } },
        },
        orderBy: {
          startedAt: 'desc',
        },
      }),
      this.prisma.game.count({
        where: {
          OR: [{ userId: id }, { opponentId: id }],
        },
      }),
    ]);

    const userGames = [];
    games.forEach((game) => {
      if (game.userId === id) {
        userGames.push({
          opponent: game.opponent,
          history: {
            userScore: game.History?.userScore,
            opponentScore: game.History?.opponentScore,
          },
          logs: game.user.logs,
          startedAt: game.startedAt,
        });
      } else {
        userGames.push({
          opponent: game.user,
          history: {
            userScore: game.History?.opponentScore,
            opponentScore: game.History?.userScore,
          },
          logs: game.opponent.logs,
          startedAt: game.startedAt,
        });
      }
    });
    return serializePaginationResponse(
      userGames,
      totalCount,
      limit,
      wins,
      loses,
    );
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    if (data.password) {
      if (!data.oldPassword) throw new BadRequestException('Invalid password');
      if (!(await this.verifyPassword(id, data.oldPassword)))
        throw new BadRequestException('Invalid password');
      delete data.oldPassword;
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

    const uu = await this.prisma.user.findUnique({
      where: { email: user.email },
    })
    if (uu) {
      return uu;
    }

    user = await this.prisma.user.create({
      data: {
        username: generatedUsername,
        email: user.email,
        avatar: user.avatar,
        firstName: user.firstName,
        lastName: user.lastName,
        is42User: true,
        status: UserStatus.ONLINE,
        country: user.country,
        mailVerified: true,
        logs: {
          create: initUserLogs(),
      }
      },
    });
    const haveAchievement = await this.initAcheivements(user);
    return user;
  }
  async verifyPassword(id: string, password: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) throw new NotFoundException('user not found');
    try {
      const isMatch = await bcrypt.compare(password, user.password);
      return isMatch;
    } catch (error) {
      throw new BadRequestException('Invalid credentials');
    }
  }

  async getUserStatus(id: string): Promise<{ status: UserStatus }> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { status: true },
    });
    if (!user) throw new NotFoundException('user not found');
    return user;
  }
}
