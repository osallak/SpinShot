import { Injectable, Logger, ParseUUIDPipe } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { FriendshipStatus } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { User } from 'src/types/user.types';
import { achievements } from 'src/user/constants';

@Injectable()
export class GamesRepository {
  private readonly logger = new Logger('GamesRepository');

  constructor(private readonly prismaService: PrismaService) {}
  @OnEvent('saveGame')
  public async saveGame(payload: any) {
    try {
      if (!payload || !payload.userId || !payload.opponentId) return;
      const [user, opponent] = await this.prismaService.$transaction([
        this.prismaService.user.findUnique({
          where: { id: payload.userId },
          include: {
            logs: true,
            HaveAchievement: { include: { Achivement: true } },
          },
        }),
        this.prismaService.user.findUnique({
          where: { id: payload.opponentId },
          include: {
            logs: true,
            HaveAchievement: { include: { Achivement: true } },
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
    if (!payload || !payload.id) return;
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
        where: {userId: user.id},
        data: {
          defeats: user.logs.defeats,
          victories: user.logs.victories + 1,
          level: user.logs.level + 0.3
        },
      });
      // this.checkAchievements(user, true, score.opponent);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async checkAchievements(
    user: any,
    winner: boolean,
    opponentScore: number,
    ids: { user: string; opponent?: string } = { user: user.id },
  ): Promise<void> {
    try {
      if (user.HaveAchievement.length === 0) return;
      user.HaveAchievement.forEach(async (achievement) => {
        if (
          achievement.Achivement.name === achievements[0].name &&
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
          achievement.Achivement.name === achievements[1].name &&
          !achievement.achieved
        ) {
          if (user.logs.victories + user.logs.defeats >= 10) {
            await this.prismaService.haveAchievement.update({
              where: { id: achievement.id },
              data: { achieved: true },
            });
          } else {
            await this.prismaService.haveAchievement.update({
              where: {id: achievement.id},
              data: {
                level: {increment: 1},
              }
            });
          }
          return;
        }

        if (
          achievement.Achivement.name === achievements[2].name &&
          !achievement.achieved &&
          winner
        ) {
          if (opponentScore === 0) {
            await this.prismaService.haveAchievement.update({
              where: { id: achievement.id },
              data: { achieved: true },
            });
            return;
          }
        }

        if (
          achievement.Achivement.name === achievements[3].name &&
          !achievement.achieved &&
          ids.opponent
        ) {
          const sortedIds = [ids.user, ids.opponent].sort();
          const friendship = await this.prismaService.friendship.findUnique({
            where: {
              leftUserId_rightUserId: {
                leftUserId: sortedIds[0],
                rightUserId: sortedIds[1],
              },
            },
          });
          if (!friendship) return;
          if (
            friendship.status === FriendshipStatus.BLOCKED ||
            friendship.status === FriendshipStatus.NOT_FOUND
          )
            return;

          await this.prismaService.haveAchievement.update({
            where: { id: achievement.id },
            data: { achieved: true },
          });
        }
      });
    } catch (error) {
      this.logger.error(error?.message);
      this.logger.error(error?.code);
    }
  }

  async achieveLoser(user: User): Promise<void> {
    try {
    await this.prismaService.logs.update({
      where: {userId: user.id},
      data: {
        defeats: user.logs.defeats + 1,
        victories: user.logs.victories,
        level: user.logs.level,
      },
    });
    } catch(error) {
      // console.log(error);
    }
  }

  async achieveUser(
    user: User,
    opponent: User,
    score: { user: number; opponent: number },
  ): Promise<void> {
    if (score.user > score.opponent) {
      await this.achieveWinner(user, {
        user: score.user,
        opponent: score.opponent,
      });
      await this.achieveLoser(opponent);
    } else {
      await this.achieveWinner(opponent, {
        user: score.opponent,
        opponent: score.user,
      });
      await this.achieveLoser(user);
    }
    this.checkAchievements(user, score.user > score.opponent, score.opponent, {
      user: user.id,
      opponent: opponent.id,
    });
    this.checkAchievements(opponent, score.opponent > score.user, score.user, {
      user: opponent.id,
      opponent: user.id,
    });
  }
}
