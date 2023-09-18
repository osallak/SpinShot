import { BadRequestException, Body, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoomDto } from './dtos/create-room.dto';
import { JoinRoomDto } from './dtos/join-room.dto';
import {
  RoomType,
  UserRole,
  UserStatus,
  UserStatusGroup,
} from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Response } from 'src/global/interfaces';
import { Room } from './dtos/find-room.dto';
import { UserService } from 'src/user/user.service';
import { MuteUserInRoomDto } from './dtos/mute-user-in-room.dto';
import { ChatService } from 'src/chat/chat.service';
@Injectable()
export class RoomService {
  private readonly logger: Logger = new Logger('room');
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  async findRoomByName(
    body: JoinRoomDto | CreateRoomDto | MuteUserInRoomDto,
  ): Promise<Room | null> {
    if (body instanceof CreateRoomDto) {
      for (let e in RoomType) {
        const room = await this.prismaService.roomChat.findUnique({
          where: {
            id: body.name,
            type: e as RoomType,
          },
        });
        if (room) {
          return {
            name: room.id,
            type: e,
            password: room.password,
          };
        }
      }
      return null;
    } else {
      const room = await this.prismaService.roomChat.findUnique({
        where: {
          id: body.name,
          type: body.type,
        },
      });
      if (room) {
        return {
          name: room.id,
          type: room.type,
          password: room.password,
        };
      }
    }
  }

  async createRoom(room: CreateRoomDto): Promise<Response> {
    // TODO: the user who created the room is by default the admin, DONE!
    try {
      if (!(await this.userService.findOneById(room.userId))) {
        return {
          status: 403,
          message: 'User does not exist',
        };
      }
      const pRoom = await this.findRoomByName(room);
      if (pRoom) {
        return {
          status: 400,
          message: 'Room exists',
        };
      }
      let passwordToBeSaved = null;
      if (room.type === RoomType.PROTECTED) {
        if (!room?.password || room.password === '') {
          return {
            status: 400,
            message: 'Password must not be empty',
          };
        }
        const salt = await bcrypt.genSalt(10);
        let hashedPassword: string = await bcrypt.hash(room.password, salt);
        passwordToBeSaved = hashedPassword;
      }
      await this.prismaService.roomChat.create({
        data: {
          id: room.name,
          type: room.type,
          password: passwordToBeSaved,
        },
      });
      await this.createNewMember(room.userId, room.name, UserRole.ADMIN);
      return {
        status: 201,
        message: 'Room created successfully',
      };
    } catch (e) {
      this.logger.error('createRoom failed');
      return {
        status: 500,
        message: 'Failed to create Room',
      };
    }
  }

  private async isUserAMember(
    userId: string,
    roomName: string,
  ): Promise<boolean> {
    const res = await this.prismaService.roomChatConversation.findUnique({
      where: {
        roomChatId_userId: {
          roomChatId: roomName,
          userId: userId,
        },
      },
    });
    if (res) {
      return true;
    } else {
      return false;
    }
  }

  private async createNewMember(
    userId: string,
    roomName: string,
    userRole: UserRole,
  ) {
    await this.prismaService.roomChatConversation.create({
      data: {
        userRole: userRole as UserRole,
        userStatus: null,
        RoomChat: {
          connect: {
            id: roomName,
          },
        },
        User: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async getUserRoomStatus(
    userId: string,
    roomName: string,
  ): Promise<UserStatusGroup | null> {
    const user = await this.prismaService.roomChatConversation.findUnique({
      where: {
        roomChatId_userId: {
          roomChatId: roomName,
          userId: userId,
        },
      },
      select: {
        userStatus: true,
      },
    });
    if (user?.userStatus) {
      return user.userStatus;
    } else {
      return null;
    }
  }

  async updateUserStatusInGroup(
    userId: string,
    roomName: string,
    status: UserStatusGroup | null,
  ) {
    await this.prismaService.roomChatConversation.update({
      where: {
        roomChatId_userId: {
          roomChatId: roomName,
          userId: userId,
        },
      },
      data: {
        userStatus: status,
      },
    });
  }

  async joinRoom(room: JoinRoomDto): Promise<Response> {
    try {
      if (!(await this.userService.findOneById(room.userId))) {
        return {
          status: 403,
          message: 'User does not exist',
        };
      }
      const pRoom = await this.findRoomByName(room);
      if (!pRoom) {
        return {
          status: 404,
          message: 'Room was not found',
        };
      }
      if (await this.isUserAMember(room.userId, room.name)) {
        return {
          status: 400,
          message: 'User is already a member',
        };
      }

      if (pRoom.type === RoomType.PROTECTED) {
        if (
          !room?.password ||
          !(await bcrypt.compare(room?.password ?? '', pRoom.password))
        ) {
          return {
            status: 401,
            message: 'Invalid credentials',
          };
        }
      } else if (pRoom.type === RoomType.PRIVATE) {
        const userStatusInGroup = await this.getUserRoomStatus(
          room.userId,
          room.name,
        );
        if (userStatusInGroup != UserStatusGroup.INVITED) {
          return {
            status: 403,
            message: 'Invalid invitation',
          };
        }
        // TODO should I reset the groupStatus, yes
        await this.updateUserStatusInGroup(room.userId, room.name, null);
      }
      await this.createNewMember(room.userId, room.name, UserRole.BASIC);
      return {
        status: 200,
        message: 'Room has new member',
      };
    } catch (e) {
      this.logger.error('joinRoom failed');
      return {
        status: 500,
        message: 'Room panicked',
      };
    }
  }

  private async isUserAdmin(userId: string, roomName: string) {
    const res = await this.prismaService.roomChatConversation.findUnique({
      where: {
        roomChatId_userId: {
          roomChatId: roomName,
          userId: userId,
        },
        userRole: UserRole.ADMIN,
      },
    });
    if (res) {
      return true;
    } else {
      return false;
    }
  }

  private async getUserRole(
    userId: string,
    roomName: string,
  ): Promise<UserRole | null> {
    const res = await this.prismaService.roomChatConversation.findUnique({
      where: {
        roomChatId_userId: {
          roomChatId: roomName,
          userId: userId,
        },
      },
      select: {
        userRole: true,
      },
    });
    return res?.userRole ?? null;
  }

  async muteUsersInRoom(room: MuteUserInRoomDto): Promise<Response> {
    try {
      const pRoom = await this.findRoomByName(room);
      if (!(await this.userService.findOneById(room.userId))) {
        return {
          status: 403,
          message: 'User does not exist',
        };
      }
      if (!pRoom) {
        return {
          status: 404,
          message: 'Room was not found',
        };
      }
      const userRole = await this.getUserRole(room.userId, room.name);
      if (userRole != UserRole.ADMIN) {
        return {
          status: 403,
          message: 'User must be admin',
        };
      }
    } catch {
      this.logger.error('muteUsersInRoom failed');
      return {
        status: 500,
        message: 'Operation mute is impossible',
      };
    }
  }
}
