import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PrismaService } from 'nestjs-prisma';
import { User } from 'src/types/user.types';

@Injectable()
export class GamesRepository {
  private readonly logger = new Logger('GamesRepository');

  constructor(private readonly prismaService: PrismaService) {}
  @OnEvent('saveGame')
  public async saveGame(payload: any) {
    const [user, opponent] = await this.prismaService.$transaction([
      this.prismaService.user.findUnique({
        where: { id: payload.userID },
        include: { logs: true },
      }),
      this.prismaService.user.findUnique({
        where: { id: payload.opponentId },
        include: { logs: true },
      }),
    ]);
    if (!user || !opponent) return;

    // this.achieveUsers(user, opponent);
    try {
      const game = await this.prismaService.game.create({
        data: {
          userId: payload.userId,
          opponentId: payload.opponentId,
          map: payload.map,
          accepted: true,
        },
      });
      if (!game) {
        throw new Error('Game not created');
      }
      await this.prismaService.history.create({
        data: {
          userId: payload.userId,
          opponentId: payload.opponentId,
          userScore: payload.userScore,
          opponentScore: payload.opponentScore,
          gameId: game.id,
        },
      });
    } catch (error) {
      this.logger.error(error.message);
      this.logger.error(error.code);
    }
  }

  @OnEvent('userUpdate')
  async updateUser(payload: any): Promise<void> {
    console.log('userUpdate: ', payload);
    if (!payload.id) return;
    await this.prismaService.user.update({
      where: { id: payload.id },
      data: { status: payload.status },
    });
  }

  async achieveWinner(user: User): Promise<void> {
    await this.prismaService.logs.update({
      where: { id: user.logs.id },
      data: {
        victories: user.logs.victories + 1,
        level: user.logs.level + 0.3,
      },
    });
    // const achievements = await this.prismaService.haveAchievement.findMany({
    //   where: { userId: user.id },
    // });
    // if ()
  }

  async achieveLoser(user: User): Promise<void> {
    await this.prismaService.logs.update({
      where: { id: user.logs.id },
      data: { defeats: user.logs.defeats + 1 },
    });
  }

  async achieveUser(
    user: User,
    opponent: User,
    score: { user: number; opponent: number },
  ): Promise<void> {
    if (score.user > score.opponent) {
      await this.achieveWinner(user);
      await this.achieveLoser(opponent);
    }
  }
}
