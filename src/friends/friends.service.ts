import { BadRequestException, Injectable } from '@nestjs/common';
import { FriendshipStatus } from '@prisma/client';
import { PaginationResponse, Response } from 'src/global/interfaces';
import { serializeService } from 'src/global/services';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/types';
import { FriendsQueryDto } from './dto/pagination.dto';

@Injectable()
export class FriendsService {
  constructor(private readonly prismaService: PrismaService) {}

  async addFriend(friendId: string, userId: string): Promise<Response> {
    const sortedIds: string[] = [userId, friendId].sort();
    if (userId === friendId) throw new BadRequestException();
    const friendship = await this.prismaService.friendship.findUnique({
      where: {
        leftUserId_rightUserId: {
          leftUserId: sortedIds[0],
          rightUserId: sortedIds[1],
        },
      },
    });
    if (friendship && friendship.status === FriendshipStatus.NOT_FOUND) {
      await this.prismaService.friendship.update({
        where: {
          leftUserId_rightUserId: {
            leftUserId: sortedIds[0],
            rightUserId: sortedIds[1],
          },
        },
        data: {
          status: FriendshipStatus.PENDING,
        },
      });
    } else {
      await this.prismaService.friendship.create({
        data: {
          leftUserId: sortedIds[0],
          rightUserId: sortedIds[1],
          status: FriendshipStatus.PENDING,
          sender: userId,
        },
      });
    }
    console.log('friendship', friendship);
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
      status: query.status,
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
          status: true,
          sender: true,
        },
        skip: query.getSkip(),
        take: query.limit,
      }),
      this.prismaService.friendship.count({
        where,
      }),
    ]);

    const friends = friendships.map((friendship) => {
      const friend =
        friendship.leftUser.id === user.id
          ? friendship.rightUser
          : friendship.leftUser;
      return {
        ...friend,
        status: friendship.status,
        sender: friendship.sender,
      };
    });
    return serializeService.serializePaginationResponse(
      friends,
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
        status: FriendshipStatus.BLOCKED,
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
    if (!friendship)
      throw new BadRequestException('No pending request to accept');
    if (
      (friendship.status in FriendshipStatus &&
        friendship.status !== 'PENDING') ||
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
      data: { status: FriendshipStatus.ACCEPTED },
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
    if (friendship.status !== FriendshipStatus.BLOCKED)
      throw new BadRequestException('no user to unblock');
    if (friendship.blocker !== userId)
      throw new BadRequestException('user must be the blocker');
    await this.prismaService.friendship.update({
      where: {
        leftUserId_rightUserId,
      },
      data: { status: FriendshipStatus.NOT_FOUND, blocker: null },
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
    if (friendship.status !== FriendshipStatus.ACCEPTED)
      throw new BadRequestException('cannot unfriend non-friend');
    await this.prismaService.friendship.update({
      where: {
        leftUserId_rightUserId,
      },
      data: { status: FriendshipStatus.NOT_FOUND },
    });
    return {
      status: 201,
      message: 'friend removed successfully',
    };
  }

  async reject(userId: string, senderId): Promise<Response> {
    const sortedIds: string[] = [userId, senderId].sort();
    const friendship = await this.prismaService.friendship.findUnique({
      where: {
        leftUserId_rightUserId: {
          leftUserId: sortedIds[0],
          rightUserId: senderId[1],
        },
      },
    });
    if (friendship.status !== FriendshipStatus.PENDING)
      throw new BadRequestException('No Pending Requests To Reject');
    if (friendship.sender !== senderId)
      throw new BadRequestException('Invalid Sender Id');
    await this.prismaService.friendship.update({
      where: {
        leftUserId_rightUserId: {
          leftUserId: sortedIds[0],
          rightUserId: sortedIds[1],
        },
      },
      data: {
        status: FriendshipStatus.NOT_FOUND,
      },
    });
    return {
      status: 201,
      message: 'request rejected'
    }
  }
}
