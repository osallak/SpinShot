import {
  BadRequestException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FriendshipStatus } from '@prisma/client';
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
  }

  async getAll(
    user: User,
    query: FriendsQueryDto,
  ): Promise<PaginationResponse<any>> {
    //! don't return blocked users
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
  }

  async block(userId: string, friendId: string): Promise<Response> {
    const sortedIds: string[] = [userId, friendId].sort();
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
  }

  async accept(userId: string, friendId): Promise<Response> {
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
  }

  async unblock(userId, friendId): Promise<Response> {
    const sortedIds: string[] = [userId, friendId].sort();
    const leftUserId_rightUserId = {
      leftUserId: sortedIds[0],
      rightUserId: sortedIds[1],
    };
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
  }

  async unfriend(userId: string, friendId: string): Promise<Response> {
    const sortedIds: string[] = [userId, friendId].sort();
    const leftUserId_rightUserId = {
      leftUserId: sortedIds[0],
      rightUserId: sortedIds[1],
    };
    const friendship = await this.prismaService.friendship.findUnique({
      where: {
        leftUserId_rightUserId,
      },
    });
    if (friendship.state !== FriendshipStatus.ACCEPTED)
      throw new BadRequestException('cannot unfriend non-friend');
    await this.prismaService.friendship.delete({
      where: {
        leftUserId_rightUserId,
      },
    });
    return {
      status: 201,
      message: 'friend removed successfully',
    };
  }
}
