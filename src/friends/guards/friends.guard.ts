import {
    BadRequestException,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import { FriendshipStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FriendsGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (context.getType() !== 'http') return true;

    const request = context.switchToHttp().getRequest();
    if (!request.user || !request.params.id)
      throw new BadRequestException('Missing friendId or user');

    const user = request.user;
    const sortedIds: string[] = [user.id, request.params.id].sort();
    const friendship = await this.prismaService.friendship.findUnique({
      where: {
        leftUserId_rightUserId: {
          leftUserId: sortedIds[0],
          rightUserId: sortedIds[1],
        },
      },
      select: {
        status: true,
      },
    });
    if (friendship && friendship.status === FriendshipStatus.BLOCKED)
      throw new ForbiddenException('Friendship not found or blocked');

    return true;
  }
}
