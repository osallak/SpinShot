import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FriendshipStatus } from '@prisma/client';
import { Socket } from 'socket.io';
import {
  EXCEPTION,
  INTERNAL_SERVER_ERROR_MESSAGE,
  PRIVATE_MESSAGE,
  USER_BLOCKED_MESSAGE,
  USER_SOCKETS_MESSAGE,
} from './chat.configuration';

import { eventType } from './types/event.type';
import { SendMessageDto } from './dtos/SendMessageDto.dto';

@Injectable()
export class ChatService {
  private World: Map<string, Socket[]> = new Map<string, Socket[]>();

  private logger: Logger = new Logger('Chat');

  constructor(private readonly prismaService: PrismaService) {}

  private getUserFromUrl(url: string) {
    if (!url) {
      this.logger.error('could not get the connection url');
    } else {
      const regex = /.+sender=.+&.*/g;
      if (url.match(regex)) {
        const user = url.substring(url.search('=') + 1, url.search('&'));
        if (!user || user === '') {
          this.logger.error('sender is undefined');
          return undefined;
        }
        return user;
      } else {
        this.logger.error('sender parameter does not exist');
      }
    }
  }

  addUserToWorld(socket: Socket) {
    const sender = this.getUserFromUrl(socket.request?.url);
    if (!sender) {
      return;
    }
    let user = this.World.get(sender);
    if (!user) {
      this.logger.debug(`user addedd ${sender}`);
      const sockets: Socket[] = [];
      sockets.push(socket);
      this.World.set(sender, sockets);
    } else {
      user.push(socket);
      this.logger.debug(`update existing client ${sender}`);
    }
  }

  deleteUserFromWorld(socket: Socket) {
    const sender = this.getUserFromUrl(socket.request?.url);
    const user = this.World.get(sender);
    if (user) {
      this.logger.debug(`client ${sender} is out`);
      this.World.delete(sender);
    } else {
      this.logger.error(
        'Could not disconnect client because client does not exist',
      );
    }
  }

  getSocketsAssociatedWithUser(user: string) {
    const sockets = this.World.get(user);
    return sockets;
  }

  private async isBlocked(to: string, from: string) {
    let res: Array<object> = undefined;
    try {
      res = await this.prismaService.friendship.findMany({
        where: {
          OR: [
            {
              user: {
                username: from,
              },
              state: FriendshipStatus.BLOCKED,
              friend: {
                username: to,
              },
            },
            {
              user: {
                username: to,
              },
              state: FriendshipStatus.BLOCKED,
              friend: {
                username: from,
              },
            },
          ],
        },
      });
    } catch {
      const receiver: Socket[] = this.getSocketsAssociatedWithUser(from);
      if (receiver && receiver.length > 0) {
        for (let i = 0; i < receiver.length; ++i) {
          receiver[i].emit(EXCEPTION, INTERNAL_SERVER_ERROR_MESSAGE);
        }
      }
    }
    if (res && res.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  async sendPrivateMessage(body: SendMessageDto) {
    let event: eventType = {
      event: PRIVATE_MESSAGE,
      content: body.content,
    };
    // user is blocked
    let isBlocked: boolean = undefined;
    isBlocked = await this.isBlocked(body.to, body.from);
    const receiver = this.getSocketsAssociatedWithUser(body.to);
    if (!receiver) {
			return ;
		}
    if (isBlocked === true) {
      event = {
        event: EXCEPTION,
        content: USER_BLOCKED_MESSAGE,
      };
    }
    for (let i = 0; i < receiver.length; ++i) {
      receiver[i].emit(event.event, event.content);
    }
  }
}
