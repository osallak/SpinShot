import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PrismaService } from 'nestjs-prisma';
import { User } from 'src/types/user.types';
import { achievements } from 'src/user/constants';

@Injectable()
export class GamesRepository {
  private readonly logger = new Logger('GamesRepository');

  constructor(private readonly prismaService: PrismaService) {}
  @OnEvent('saveGame')

  // this.achieveUsers(user, opponent);
  public async saveGame(payload: any) {
    try {
      const [user, opponent] = await this.prismaService.$transaction([
        this.prismaService.user.findUnique({
          where: { id: payload.userID },
          include: {
            logs: true,
            HaveAchievement: { include: { Achiement: true } },
          },
        }),
        this.prismaService.user.findUnique({
          where: { id: payload.opponentId },
          include: {
            logs: true,
            HaveAchievement: { include: { Achiement: true } },
          },
        }),
      ]);
      if (!user || !opponent) return;
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

      await this.achieveUser(user, opponent, {
        user: payload.userScore,
        opponent: payload.opponentScore,
      });
    } catch (error) {
      this.logger.error(error?.message);
      this.logger.error(error?.code);
    }
  }

  @OnEvent('userUpdate')
  async updateUser(payload: any): Promise<void> {
    if (!payload.id) return;
    try {
      await this.prismaService.user.update({
        where: { id: payload.id },
        data: { status: payload.status },
      });
    } catch (error) {
      this.logger.error(error.message);
      this.logger.error(error.code);
    }
  }

  async achieveWinner(
    user: User,
    score: { user: number; opponent: number },
  ): Promise<void> {
    try {
      await this.prismaService.logs.update({
        where: { id: user.logs.id },
        data: {
          victories: user.logs.victories + 1,
          level: user.logs.level + 0.3,
        },
      });
      this.checkAchievements(user, true, score.opponent);
    } catch (error) {
      this.logger.error(error?.message);
      this.logger.error(error?.code);
    }
  }

  async checkAchievements(
    user: User,
    winner: boolean,
    opponentScore: number,
  ): Promise<void> {
    try {
      if (user.HaveAchievement.length === 0) return;
      user.HaveAchievement.forEach(async (achievement) => {
        if (
          achievement.name === achievements[0].name &&
          !achievement.achieved &&
          winner
        ) {
          await this.prismaService.haveAchievement.update({
            where: { id: achievement.id },
            data: { achieved: true },
          });
          return;
        }
        if (
          achievement.name === achievements[1].name &&
          !achievement.achieved
        ) {
          if (user.logs.victories + user.logs.defeats >= 10) {
            await this.prismaService.haveAchievement.update({
              where: { id: achievement.id },
              data: { achieved: true },
            });
            return;
          }
        }

        if (
          achievement.name === achievements[2].name &&
          !achievement.achieved && winner
        ) {
          if (opponentScore === 0) {
            await this.prismaService.haveAchievement.update({
              where: { id: achievement.id },
              data: { achieved: true },
            });
            return;
          }
        }

        if (achievement.name === achievements[3].name) {
          //todo
        }
      });
    } catch (error) {
      this.logger.error(error?.message);
      this.logger.error(error?.code);
    }
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
      await this.achieveWinner(user, { user: score.user, opponent: score.opponent });
      await this.achieveLoser(opponent);
    } else {
      await this.achieveWinner(opponent, { user: score.opponent, opponent: score.user });
      await this.achieveLoser(user);//play total of 10 online matches, vs friend
    }
  }
}
