import { Injectable, UseFilters } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FriendshipStatus } from '@prisma/client';
import { Socket } from 'socket.io';
import {
  EXCEPTION,
  INTERNAL_SERVER_ERROR_MESSAGE,
  PRIVATE_MESSAGE,
} from './chat.configuration';

import { eventType } from './types/event.type';
import { SendMessageDto } from './dtos/send-message.dto';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { JwtAuthPayload } from 'src/auth/interfaces';
import { ChatUser } from './entities/user.entity';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class ChatService {
  private World: Map<string, ChatUser> = new Map<string, ChatUser>();

  private logger: Logger = new Logger('Chat');

  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly notificationService: NotificationService,
  ) {}

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
    const payload: JwtAuthPayload | undefined = this.extractJwtToken(socket);
    if (!payload) {
      return false;
    }
    let user = this.World.get((payload as JwtAuthPayload).sub);
    if (!user) {
      let citizen: ChatUser = new ChatUser();
      citizen.setUsername((payload as JwtAuthPayload).sub);
      citizen.addSocket(socket);
      this.World.set(citizen.getUsername(), citizen);
    } else {
      user.addSocket(socket);
    }
  }

  deleteUserFromWorld(socket: Socket) {
    const payload = this.extractJwtToken(socket) as JwtAuthPayload;
    if (!payload) return;
    const user = this.World.get((payload as JwtAuthPayload).sub);
    if (user) {
      this.World.delete(user.getUsername());
    } else {
      this.logger.error(
        'Could not disconnect client because client does not exist',
      );
    }
  }

  getSocketsAssociatedWithUser(user: string = '') {
    const sockets = this.World.get(user)?.getSockets();
    if (!sockets || sockets.length === 0) {
      return undefined;
    }
    return sockets;
  }

  private async isFriend(to: string, from: string) {
    let res: Array<object> = undefined;
    const toFrom: Array<string> = [to, from].sort();
    try {
      res = await this.prismaService.friendship.findMany({
        where: {
          leftUserId: toFrom[0],
          rightUserId: toFrom[1],
          status: FriendshipStatus.ACCEPTED,
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

  getLastMessageSent(client: Socket): string {
    const payload = this.extractJwtToken(client);

    if (!payload) {
      return '';
    }

    const user = this.World.get((payload as JwtAuthPayload).sub);

    return user.getLastMessageSent();
  }

  async saveMessageInDatabase(body: SendMessageDto) {
    return this.prismaService.conversation.create({
      data: {
        message: body.content,
        senderId: body.from,
        receiverId: body.to,
      },
    });
  }

  async sendPrivateMessage(body: SendMessageDto) {
    let event: eventType = {
      event: PRIVATE_MESSAGE,
      content: body,
    };
    let isFriend: boolean = false;
    isFriend = await this.isFriend(body.to, body.from);
    if (isFriend) {
      const receiver = this.getSocketsAssociatedWithUser(body.to);
      if (!receiver || receiver.length === 0) {
        // TODO: push to notification
        return;
      }
      for (let i = 0; i < receiver.length; ++i) {
        receiver[i].emit(event.event, JSON.stringify(event.content));
      }
      let user: ChatUser = this.World.get(body.from);
      user.setLastMessageSent(body.content);
      try {
        await this.saveMessageInDatabase(body);
      } catch (e) {
        const sender: Array<Socket> = this.getSocketsAssociatedWithUser(
          body.from,
        );
        if (!sender || sender.length === 0) return;
        event.event = EXCEPTION;
        event.content = INTERNAL_SERVER_ERROR_MESSAGE;
        for (let i = 0; i < sender.length; ++i) {
          sender[i].emit(event.event, JSON.stringify(event.content));
        }
      }
    }
  }

  extractJwtToken(client: Socket): JwtAuthPayload | undefined {
    const bearerToken = client.handshake.headers?.authorization?.split(' ')[1];
    if (!bearerToken) {
      client.disconnect();
      return undefined;
    }
    try {
      const decoded = jwt.verify(
        bearerToken,
        this.configService.get('JWT_SECRET'),
      );
      return decoded as JwtAuthPayload;
    } catch {
      client.disconnect();
      return undefined;
    }
  }
}
