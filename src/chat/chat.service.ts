import { Injectable, UseFilters } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FriendshipStatus, UserStatusGroup } from '@prisma/client';
import { Socket } from 'socket.io';
import {
  ANONYMOUS_USER_MESSAGE,
  BAD_REQUEST,
  EXCEPTION,
  GROUP_MESSAGE,
  INTERNAL_SERVER_ERROR_MESSAGE,
  PRIVATE_MESSAGE,
} from './chat.configuration';

import { eventType } from './types/event.type';
import { SendMessageDto, sendRoomMessageDto } from './dtos/send-message.dto';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { JwtAuthPayload } from 'src/auth/interfaces';
import { ChatUser } from './entities/user.entity';
import { NotificationService } from 'src/notification/notification.service';
import { UserService } from 'src/user/user.service';
import { serializePaginationResponse } from 'src/user/helpers';
import { PaginationQueryDto } from 'src/global/dto/pagination-query.dto';
import { RoomService } from 'src/room/room.service';
@Injectable()
export class ChatService {
  private World: Map<string, ChatUser> = new Map<string, ChatUser>();

  private logger: Logger = new Logger('Chat');

  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly notificationService: NotificationService,
    private readonly userService: UserService,
    private readonly roomService: RoomService,
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

  async addUserToWorld(socket: Socket) {
    const payload = await this.extractJwtToken(socket);
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

  async deleteUserFromWorld(socket: Socket) {
    const payload = (await this.extractJwtToken(socket)) as JwtAuthPayload;
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
        select: {
          leftUser: {
            select: {
              id: true,
              username: true,
              avatar: true,
            },
          },
          rightUser: {
            select: {
              id: true,
              username: true,
              avatar: true,
            },
          },
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
      return res;
    } else {
      return undefined;
    }
  }

  async saveMessageInDatabase(body: SendMessageDto) {
    const toFrom = [body.to, body.from].sort();
    return await this.prismaService.conversation.create({
      data: {
        message: body.content,
        senderId: toFrom[0],
        receiverId: toFrom[1],
        sentAt: body.timestamp,
        sender: body.from,
      },
    });
  }

  async sendPrivateMessage(body: SendMessageDto) {
    let event: eventType = {
      event: PRIVATE_MESSAGE,
      content: body,
    };
    let isFriend: any = undefined;
    try {
      isFriend = await this.isFriend(body.to, body.from);
      if (isFriend && isFriend[0]) {
        if (isFriend[0].leftUser.id == body.from) {
          event.content.senderUsername = isFriend[0].leftUser.username;
          event.content.senderAvatar = isFriend[0].leftUser.avatar;
        } else {
          event.content.senderUsername = isFriend[0].rightUser.username;
          event.content.senderAvatar = isFriend[0].rightUser.avatar;
        }
        const receiver = this.getSocketsAssociatedWithUser(body.to) ?? [];
        for (let i = 0; i < receiver.length; ++i) {
          receiver[i].emit(event.event, JSON.stringify(body));
        }
        await this.saveMessageInDatabase(body);
      } else {
        const sender: Array<Socket> = this.getSocketsAssociatedWithUser(
          body.from,
        );
        if (!sender || sender.length === 0) return;
        for (let i = 0; i < sender.length; ++i) {
          sender[i].emit(
            EXCEPTION,
            JSON.stringify({
              status: BAD_REQUEST,
              message: ANONYMOUS_USER_MESSAGE,
            }),
          );
        }
      }
    } catch (e) {
      console.log(e);
      let user: ChatUser = this.World.get(body.from);
      const sender: Array<Socket> = this.getSocketsAssociatedWithUser(
        body.from,
      );
      if (!sender || sender.length === 0) return;
      for (let i = 0; i < sender.length; ++i) {
        sender[i].emit(
          EXCEPTION,
          JSON.stringify({
            status: INTERNAL_SERVER_ERROR_MESSAGE,
            message: INTERNAL_SERVER_ERROR_MESSAGE,
          }),
        );
      }
    }
  }
  private async formatResponseBasedOnUser(message, userId) {
    let output = [];
    if (!message) {
      return output;
    }
    message.forEach((element) => {
      let obj = {};
      obj['sender'] = element.sender;
      obj['message'] = element.message;
      if (element?.Sender.id === userId) {
        obj['other'] = element?.Receiver;
      } else if (element?.Receiver.id === userId) {
        obj['other'] = element?.Sender;
      }
      obj['sentAt'] = element.sentAt;
      output.push(obj);
    });
    let response = {};
    try {
      let rooms = (await this.roomService.getAllRooms(userId))?.data;
      response['room'] = rooms;
      response['individual'] = output;
      return response;
    } catch (e) {
      console.log(e);
      return output;
    }
  }

  async extractJwtToken(client: Socket): Promise<JwtAuthPayload | undefined> {
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
      const uu = await this.userService.findOneById(
        (decoded as JwtAuthPayload).sub,
      );
      if (!uu) {
        client.disconnect();
        return undefined;
      }
      return decoded as JwtAuthPayload;
    } catch {
      client.disconnect();
      return undefined;
    }
  }

  async getAllLatestMessages(userId: string) {
    try {
      if (!userId) {
        return {
          status: 404,
          message: 'User Was Not Found',
        };
      }
      const user = await this.userService.findOneById(userId);
      if (!user) {
        return {
          status: 404,
          content: 'User was not found',
        };
      }
      const message = await this.prismaService.conversation.findMany({
        where: {
          OR: [
            {
              Sender: {
                id: userId,
              },
            },
            {
              Receiver: {
                id: userId,
              },
            },
          ],
        },
        orderBy: {
          sentAt: 'desc',
        },
        distinct: ['receiverId', 'senderId'],
        select: {
          sender: true,
          sentAt: true,
          message: true,
          Receiver: {
            select: {
              id: true,
              avatar: true,
              username: true,
            },
          },
          Sender: {
            select: {
              id: true,
              avatar: true,
              username: true,
            },
          },
        },
      });
      return {
        status: 200,
        content: this.formatResponseBasedOnUser(message, userId),
      };
    } catch (e) {
      console.log(e);
      return {
        status: 500,
        content: 'Failed to get latest messages',
      };
    }
  }

  async getIndividualMessages(userId: string, receiverId: string) {
    try {
      const users = await this.prismaService.user.findMany({
        where: {
          OR: [
            {
              id: userId,
            },
            {
              id: receiverId,
            },
          ],
        },
      });
      if (!users || !receiverId || (users && users.length != 2)) {
        return {
          status: 404,
          content: 'Users were not found',
        };
      }
      const toFrom = [userId, receiverId].sort();
      const content = await this.prismaService.conversation.findMany({
        orderBy: {
          sentAt: 'asc',
        },
        where: {
          AND: [
            {
              senderId: toFrom[0],
            },
            {
              receiverId: toFrom[1],
            },
          ],
          Receiver: {
            RightFriendship: {
              some: {
                rightUserId: toFrom[1],
                OR: [
                  {
                    status: FriendshipStatus.ACCEPTED,
                  },
                  {
                    status: FriendshipStatus.NOT_FOUND,
                  },
                ],
              },
            },
          },
          Sender: {
            LeftFriendship: {
              some: {
                leftUserId: toFrom[0],
                OR: [
                  {
                    status: FriendshipStatus.ACCEPTED,
                  },
                  {
                    status: FriendshipStatus.NOT_FOUND,
                  },
                ],
              },
            },
          },
        },
        select: {
          sentAt: true,
          sender: true,
          message: true,
        },
      });
      return {
        status: 200,
        content: content,
      };
    } catch {
      return {
        status: 500,
        content: 'Failed to retrieve messages',
      };
    }
  }

  async sendGroupMessage(body: sendRoomMessageDto) {
    return new Promise(async (resolve, reject) => {
      try {
        const roomMembers = await this.roomService.getRoomMembers(
          body.roomName,
        );
        const sender = await this.prismaService.roomChatConversation.findUnique(
          {
            where: {
              roomChatId_userId: {
                roomChatId: body.roomName,
                userId: body.from,
              },
              OR: [
                {
                  userStatus: null,
                },
                {
                  userStatus: UserStatusGroup.MUTED,
                },
              ],
            },
            select: {
              mutedAt: true,
              muteDuration: true,
              User: {
                select: {
                  username: true,
                  avatar: true,
                },
              },
            },
          },
        );
        if (sender) {
          if (
            sender?.mutedAt &&
            sender?.muteDuration &&
            BigInt(Date.now()) - BigInt(sender?.mutedAt) <=
              BigInt(sender?.muteDuration)
          ) {
            return reject({
              event: EXCEPTION,
              status: BAD_REQUEST,
              message: 'You are muted',
            });
          }
        } else {
          return reject({
            event: EXCEPTION,
            status: BAD_REQUEST,
            message: 'You are not a member of this room',
          });
        }
        body.senderUsername = sender?.User?.username;
        body.senderAvatar = sender?.User?.avatar;
        roomMembers?.forEach((member) => {
          if (member?.userId !== body.from) {
            let memberSockets = this.getSocketsAssociatedWithUser(
              member?.userId,
            );
            memberSockets?.forEach((socket) => {
              socket.emit(GROUP_MESSAGE, JSON.stringify(body));
            });
          }
        });
        if (sender) {
          await this.prismaService.message.create({
            data: {
              message: body.content,
              sentAt: body.timestamp,
              RoomChatConversation: {
                connect: {
                  roomChatId_userId: {
                    roomChatId: body.roomName,
                    userId: body.from,
                  },
                },
              },
              RoomChat: {
                connect: {
                  id: body.roomName,
                },
              },
              user: {
                connect: {
                  id: body.from,
                },
              },
            },
          });
        }
      } catch (e) {
        console.log(e);
        return reject({
          event: EXCEPTION,
          status: INTERNAL_SERVER_ERROR_MESSAGE,
          message: INTERNAL_SERVER_ERROR_MESSAGE,
        });
      }
    });
  }
}
