import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FriendshipStatus } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PaginationResponse } from 'src/global/interfaces';
import { User } from 'src/types';
import { FriendsQueryDto } from './dto/pagination.dto';
import { serializeService } from 'src/global/services';
import { Response } from 'src/global/interfaces';

@Injectable()
export class FriendsService {
  private readonly logger = new Logger('FriendService');
  constructor(private readonly prismaService: PrismaService) {}
  async addFriend(friendId: string, userId: string): Promise<Response> {
    const sortedIds: string[] = [userId, friendId].sort();
    try {
      if (userId === friendId) throw new BadRequestException();
      await this.prismaService.friendship.create({
        data: {
          leftUserId: sortedIds[0],
          rightUserId: sortedIds[1],
          state: 'PENDING',
          sender: userId,
        },
      });
      //todo: send notif to client 
      return {
        status: 201,
        message: 'Added successfully',
      };
    } catch (error) {
      if (error instanceof ConflictException)
        throw new ConflictException('Friendship already exists');
      if (error instanceof PrismaClientKnownRequestError)
        throw new BadRequestException();
      if (error instanceof BadRequestException) throw error;
      this.logger.error(error.message);
      throw new InternalServerErrorException('unable to send friend request');
    }
  }

  async getAll(
    user: User,
    query: FriendsQueryDto,
  ): Promise<PaginationResponse<any>> {
    try {
      const where = {
        OR: [
          {
            AND: [{ leftUserId: user.id }, { rightUserId: { gt: user.id } }],
          },
          {
            AND: [{ rightUserId: user.id }, { leftUserId: { lt: user.id } }],
          },
        ],
        state: query.state,
      };
      const select = {
        id: true,
        username: true,
        email: true,
        avatar: true,
      };
      const [friendships, totalCount] = await this.prismaService.$transaction([
        this.prismaService.friendship.findMany({
          where,
          select: {
            leftUser: { select },
            rightUser: { select },
            state: true,
            sender: true,
          },
          skip: query.getSkip(),
          take: query.limit,
        }),
        this.prismaService.friendship.count({
          where,
        }),
      ]);
      return serializeService.serializePaginationResponse(
        friendships,
        totalCount,
        query.limit,
      );
    } catch (error) {
      if (error instanceof NotFoundException)
        throw new NotFoundException('user not found');
      if (error instanceof PrismaClientKnownRequestError)
        throw new BadRequestException('something went wrong');
      this.logger.error(error.message);
      throw new InternalServerErrorException('unable to load friends');
    }
  }

  async block(userId: string, friendId: string): Promise<Response> {
    const sortedIds: string[] = [userId, friendId].sort();
    try {
      await this.prismaService.friendship.update({
        where: {
          leftUserId_rightUserId: {
            leftUserId: sortedIds[0],
            rightUserId: sortedIds[1],
          },
        },
        data: {
          state: FriendshipStatus.BLOCKED,
          blocker: userId,
        },
      });
      return {
        status: 201,
        message: 'user blocked successfully',
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw new NotFoundException('');
      if (error instanceof PrismaClientKnownRequestError)
        throw new BadRequestException();
      throw new InternalServerErrorException('failed to block user');
    }
  }

  async accept(userId: string, friendId): Promise<Response> {
    try {
      const sortedIds: string[] = [userId, friendId].sort();
      const friendship = await this.prismaService.friendship.findUnique({
        where: {
          leftUserId_rightUserId: {
            leftUserId: sortedIds[0],
            rightUserId: sortedIds[1],
          },
        },
      });
      if (
        (friendship.state in FriendshipStatus &&
          friendship.state !== 'PENDING') ||
        friendship.sender === userId
      )
        throw new BadRequestException('No pending request to accept');
      await this.prismaService.friendship.update({
        where: {
          leftUserId_rightUserId: {
            leftUserId: sortedIds[0],
            rightUserId: sortedIds[1],
          },
        },
        data: { state: FriendshipStatus.ACCEPTED },
      });
      //todo: notification
      return {
        status: 201,
        message: 'friend request accepted',
      };
    } catch (error) {
      if (error instanceof NotFoundException)
        throw new NotFoundException('User Not Found');
      if (error instanceof BadRequestException) throw error;
      if (error instanceof PrismaClientKnownRequestError)
        throw new BadRequestException();
      throw new InternalServerErrorException('failed to accept user');
    }
  }

  async unblock(userId, friendId): Promise<Response> {
    const sortedIds: string[] = [userId, friendId].sort();
    const leftUserId_rightUserId = {
      leftUserId: sortedIds[0],
      rightUserId: sortedIds[1],
    };
    try {
      const friendship = await this.prismaService.friendship.findUnique({
        where: {
          leftUserId_rightUserId,
        },
      });
      if (friendship.state !== FriendshipStatus.BLOCKED)
        throw new BadRequestException('no user to unblock');
      if (friendship.blocker !== userId)
        throw new BadRequestException('user must be the blocker');
      await this.prismaService.friendship.delete({
        where: {
          leftUserId_rightUserId,
        },
      });
      return {
        status: 201,
        message: 'user unblocked successfully',
      };
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      if (error instanceof PrismaClientKnownRequestError)
        throw new BadRequestException('unable to unblock user');
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        'something went wrong while trying to unblock user',
      );
    }
  }
}
